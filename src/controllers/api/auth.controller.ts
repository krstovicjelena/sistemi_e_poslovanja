import { Controller, Post, Body, Req, HttpException, HttpStatus } from "@nestjs/common";
import { EmployeeService } from "src/services/employee/employee.service";
import { LoginEmployeeDto } from "src/dtos/employees/login.employee.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoEmployeeDto } from "src/dtos/employees/login.info.employee.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataEmployeeDto } from "src/dtos/employees/jwt.data.employee.dto";
import { Request } from "express";
import { jwtSecret } from "src/config/jwt.secret";
import { JwtRefreshDataEmployeeDto } from "src/dtos/employees/jwt.refresh.dto";
import { EmployeeRefreshTokenDto } from "src/dtos/employees/employee.refresh.token.dto";


 
@Controller('auth')
export class AuthController{
    constructor(public employeeService:EmployeeService,
        
        ){}

    @Post('login')
    async doLogin(@Body() data:LoginEmployeeDto, @Req() req:Request):Promise<ApiResponse|LoginInfoEmployeeDto>{
        const employee = await this.employeeService.getByUsername(data.username);

        if(!employee){
            return new Promise(resolve=>resolve(new ApiResponse('error',-3001, "Nije prnadjem zaposleni")));
        }

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(employee.passwordHash !==passwordHashString){
            return new Promise(resolve=>resolve(new ApiResponse('error',-3002, "Nije dobar password")));
        }
        
        //token je json koji u sebi sadrsi employeeId, username, exp, ip, ua
 const jwtData=new JwtDataEmployeeDto();
        jwtData.employeeId=employee.employeeId;
        jwtData.username=employee.username;
        jwtData.exp=this.getDatePlus(60*1);
        jwtData.ip=req.ip.toString();
        jwtData.ua=req.headers["user-agent"];



        let token:string=jwt.sign(jwtData.toPlainObject(),jwtSecret); //jwt secret tajni kod za sifrovanje preko koga se sifruje json

        const jwtRefreshData=new JwtRefreshDataEmployeeDto();
        jwtRefreshData.employeeId=jwtData.employeeId;
        jwtRefreshData.username=jwtData.username;
        jwtRefreshData.exp=this.getDatePlus(60*60*24*31);
        jwtRefreshData.ip=jwtData.ip;
        jwtRefreshData.ua=jwtData.ua;

        let refreshToken:string=jwt.sign(jwtRefreshData.toPlainObject(),jwtSecret);

        const responseObject=new LoginInfoEmployeeDto(
            employee.employeeId,
            employee.username,
            token,
            refreshToken,
            this.getIsoDate(jwtRefreshData.exp)
            );

        await this.employeeService.addToken(employee.employeeId,refreshToken,this.getDataBaseDateFormat(this.getIsoDate(jwtRefreshData.exp)))
        return new Promise(resolve=>resolve(responseObject))
        
    }

    @Post('refresh')
    async employeeTokenRefresh(@Req() req:Request,@Body() data:EmployeeRefreshTokenDto):Promise<LoginInfoEmployeeDto|ApiResponse>{
         const empToken = await this.employeeService.getEmployeeToken(data.token);

         if (!empToken){
            return new ApiResponse("error",-10002,"No such refresh token")
         }

         if(empToken.isValid == 0){
            return new ApiResponse("error",-10003,"The token is no longer valid")
         }

         const sada=new Date();
         const datumIsteka=new Date(empToken.expiresAt);
         console.log(datumIsteka);
         console.log(sada);
         if(datumIsteka.getTime()<sada.getTime()){
            return new ApiResponse("error",-10004,"The token has expired")
         }
          //formiraj jwt objekat
        let jwtRefreshData:JwtRefreshDataEmployeeDto;

        try{
            jwtRefreshData=jwt.verify(data.token,jwtSecret);}
        catch(e){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
           
        }

         //ako nije ok jwtData opet Http Exception
         if(!jwtRefreshData){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtRefreshData.ip !== req.ip.toString()){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtRefreshData.ua !== req.headers["user-agent"]){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        
        const jwtData=new JwtDataEmployeeDto();
        jwtData.employeeId=jwtRefreshData.employeeId;
        jwtData.username=jwtRefreshData.username;
        jwtData.exp=this.getDatePlus(60*5);
        jwtData.ip=jwtRefreshData.ip;
        jwtData.ua=jwtRefreshData.ua;

        let token:string=jwt.sign(jwtData.toPlainObject(),jwtSecret);

          const responseObject=new LoginInfoEmployeeDto(
            jwtData.employeeId,
            jwtData.username,
            token,
            data.token,
            this.getIsoDate(jwtRefreshData.exp));

        return responseObject;
         
    }


    private getDatePlus(numberOfSeconds:number){
        return new Date().getTime() / 1000 + numberOfSeconds;
    }

    private getIsoDate(timestamp:number){
        const date=new Date();
        date.setTime(timestamp*1000); 
        return date.toISOString();


    }

    private getDataBaseDateFormat(iso:string):string{
        return iso.substr(0,19).replace('T',' ');
    }
}