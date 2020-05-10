import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'entities/employee.entity';
import { Repository } from 'typeorm';

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



}
