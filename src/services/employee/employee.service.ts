import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../../entities/employee.entity';
import { Repository } from 'typeorm';
import { AddEmployeeDto } from '../../dtos/employees/add.employee.dto';
import { EditEmployeeDto } from '../../dtos/employees/edit.employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
       @InjectRepository(Employee) 
       private readonly employee: Repository<Employee>,      
    ){}

    getAll():Promise<Employee[]>{
        return this.employee.find();
    }

    getById(id:number):Promise<Employee>{
        return this.employee.findOne(id);
    }

    add(data:AddEmployeeDto):Promise<Employee>{
        const crypto=require('crypto');
        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let newEmployee:Employee=new Employee();
        newEmployee.username=data.username;
        newEmployee.passwordHash=passwordHashString;

        return this.employee.save(newEmployee);
    }

    async editById(id:number,data:EditEmployeeDto):Promise<Employee>{
        let employee= await this.employee.findOne(id);

        const crypto=require('crypto');
        const passwordHash=crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        employee.passwordHash=passwordHashString;

        return this.employee.save(employee); 


    }



}
