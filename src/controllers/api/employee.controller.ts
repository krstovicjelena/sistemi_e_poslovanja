import { Controller,Get, Param, Put,Body, Post } from "@nestjs/common";
import { EmployeeService } from "../../services/employee/employee.service";

import { AddEmployeeDto } from "../../dtos/employees/add.employee.dto";
import { EditEmployeeDto } from "../../dtos/employees/edit.employee.dto";
import { Employee } from "../../entities/employee.entity";
import { ApiResponse } from "src/misc/api.response.class";


@Controller('api/employee')
export class EmployeeController{
    constructor(
        private employeeService:EmployeeService
    ){}
    
    //GET localhost:3000/api/employee
    @Get()
    getAll():Promise<Employee[]> {
      return this.employeeService.getAll();
    }

    //GET localhost:3000/api/employee/4/
    @Get(':id')
    getById(@Param('id') employeeId:number ):Promise<Employee|ApiResponse> {
      return this.employeeService.getById(employeeId);
    }

    //PUT localhost:3000/api/employee
    //dakle metod add je napravljen u servisu i ovde se samo poziva, ne opterecujujemo kontroler
    @Put()
    add(@Body() data:AddEmployeeDto): Promise<Employee|ApiResponse>{
        return this.employeeService.add(data);

    }
    //POST localhost:3000/api/employee/4
    @Post(':id')
    edit(@Param('id') id:number, @Body() data:EditEmployeeDto):Promise<Employee|ApiResponse>{
        return this.employeeService.editById(id,data);
    }

}