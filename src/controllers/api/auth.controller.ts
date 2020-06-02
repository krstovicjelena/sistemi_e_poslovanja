import { Controller, Post, Body, Req } from "@nestjs/common";
import { EmployeeService } from "src/services/employee/employee.service";
import { LoginEmployeeDto } from "src/dtos/employees/login.employee.dto";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from 'crypto';
import { LoginInfoEmployeeDto } from "src/dtos/employees/login.info.employee.dto";
import * as jwt from 'jsonwebtoken';
import { JwtDataEmployeeDto } from "src/dtos/employees/jwt.data.employee.dto";
import { Request } from "express";
import { jwtSecret } from "src/config/jwt.secret";

@Controller('auth')
export class AuthController{
    constructor(public employeeService:EmployeeService){}

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
        let sada = new Date();
        sada.setDate(sada.getDate()+14);
        const istek=sada.getTime()/1000; //konvertovanje u timestamp milisekunde
        jwtData.exp=istek;
        jwtData.ip=req.ip.toString();
        jwtData.ua=req.headers["user-agent"];



        let token:string=jwt.sign(jwtData.toPlainObject(),jwtSecret); //jwt secret tajni kod za sifrovanje preko koga se sifruje json

        const responseObject=new LoginInfoEmployeeDto(
            employee.employeeId,
            employee.username,
            token);

        return new Promise(resolve=>resolve(responseObject))


        
    }
}