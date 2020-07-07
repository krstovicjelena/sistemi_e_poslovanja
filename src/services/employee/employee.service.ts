import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities/employee.entity';
import { EmployeeToken } from '../../entities/employee-token.entity';
import { Repository } from 'typeorm';
import { AddEmployeeDto } from '../../dtos/employees/add.employee.dto';
import { EditEmployeeDto } from '../../dtos/employees/edit.employee.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import * as crypto from 'crypto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class EmployeeService extends TypeOrmCrudService<Employee> {
    constructor(
       @InjectRepository(Employee) 
       private readonly employee: Repository<Employee>, 
       @InjectRepository(EmployeeToken) 
       private readonly eToken: Repository<EmployeeToken>,         
    ){super(employee)}

    getAll():Promise<Employee[]>{
        return this.employee.find();
    }

    getById(id:number):Promise<Employee|ApiResponse>{

        return new Promise (async (resolve)=>{
            let employee= await this.employee.findOne(id);
            if(employee === undefined){
                resolve(new ApiResponse("error",-1002,"Ne postoji administrator sa ovim id-jem"));
            }
            resolve(employee);
        })
    }

    add(data:AddEmployeeDto):Promise<Employee|ApiResponse>{
       
        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newEmployee:Employee=new Employee();
        newEmployee.username=data.username;
        newEmployee.passwordHash=passwordHashString;

        return new Promise ((resolve)=> {
            this.employee.save(newEmployee)
            .then(data=>resolve(data))
            .catch(error=>{
                const response: ApiResponse = new ApiResponse("error",-1001);
                resolve(response);
            });
        });

    }

    async getByUsername(user:string):Promise<Employee|null>{
        const employee = await this.employee.findOne({
            username:user
        });

        if(employee){
            return employee;
        }
        return null;

    }
    async editById(id:number,data:EditEmployeeDto):Promise<Employee|ApiResponse>{
        let employee= await this.employee.findOne(id);

        if(employee === undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1002,"Ne postoji administrator sa ovim id-jem"));
            })
        }

        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        employee.passwordHash=passwordHashString;

        return this.employee.save(employee); 


    }

    async addToken(employeeId:number, token:string, expiresAt:string ){
        const empToken = new EmployeeToken();
        empToken.employeeId=employeeId;
        empToken.token=token;
        empToken.expiresAt=expiresAt;
        
        return await this.eToken.save(empToken);

    }

    async getEmployeeToken(token:string):Promise<EmployeeToken>{
    
        return await this.eToken.findOne({
            token:token
        });

    }

    async invalidateToken(token:string):Promise<EmployeeToken|ApiResponse>{
        const empToken= await this.eToken.findOne({
            token:token
        });

        if(!empToken){
            return new ApiResponse("error",-10001,"No such refresh token!");
        }
        empToken.isValid=0;
        await this.eToken.save(empToken);

        return await this.getEmployeeToken(token);

    }

    async invalidetEmployeeTokens(employeeId:number):Promise<(EmployeeToken| ApiResponse)[]>{

        const empTokens = await this.eToken.find({
            employeeId:employeeId
        });

        const results=[];

        for(const et of empTokens){
            results.push(this.invalidateToken(et.token));
        }

        return results;

    }
}
