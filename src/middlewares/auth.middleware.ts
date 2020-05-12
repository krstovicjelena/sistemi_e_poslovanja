import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "src/services/employee/employee.service";
import * as jwt from 'jsonwebtoken';
import { JwtDataEmployeeDto } from "src/dtos/employees/jwt.data.employee.dto";
import { jwtSecret } from "src/config/jwt.secret";

@Injectable() //injektuje se u apply fju consumera
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly employeeService:EmployeeService){}
    async use(req:Request, res: Response, next: NextFunction) { //NEXT JE FUNKCIJA KOJA SE SLEDECE POKRECE
        //ako je sve proslo ok pozivamo samo next, a ako ne onda hvatamo izuzetak
        //ako nemamo header authorization prekidamo dalji rad
        if(!req.headers.authorization){
            throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED); //nema tokena nije autoziovan
        }
        //izvuci token
        const token = req.headers.authorization;

        //ovo radimo zbog postmana da ne bi imali svaki put rucno unosenje tokena
        const tokenParts=token.split(' ');
        if(tokenParts.length!==2){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        const tokenString=tokenParts[1];

        //formiraj jwt objekat
        let jwtData:JwtDataEmployeeDto;

        try{
        jwtData=jwt.verify(tokenString,jwtSecret);}
        catch(e){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        //ako nije ok jwtData opet Http Exception
        if(!jwtData){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        if(jwtData.ua !== req.headers["user-agent"]){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED); 
        }
        const employee=await this.employeeService.getById(jwtData.employeeId);
        if(!employee){
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);  
        }

        const trenutno=new Date().getTime()/1000; 
        if(trenutno>=jwtData.exp){
            throw new HttpException("Token has expired", HttpStatus.UNAUTHORIZED); 
        }

        //ukoliko se nije desila nijedna od prethodno navedenih mogucih gresaka samo idemo next
        //da li nas middleware treba da prekine i oresretne dalje izvrsavanje metoda
        next();
        
    }

}