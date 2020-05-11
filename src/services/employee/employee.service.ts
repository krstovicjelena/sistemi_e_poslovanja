import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../../entities/employee.entity';
import { Repository } from 'typeorm';
import { AddEmployeeDto } from '../../dtos/employees/add.employee.dto';
import { EditEmployeeDto } from '../../dtos/employees/edit.employee.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import * as crypto from 'crypto';

@Injectable()
export class EmployeeService {
    constructor(
       @InjectRepository(Employee) 
       private readonly employee: Repository<Employee>,      
    ){}

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



}
