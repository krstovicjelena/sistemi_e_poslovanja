import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from './services/employee/employee.service';


@Controller()
export class AppController {
  constructor(
    private employeeService:EmployeeService
  ){}

  @Get('api/employee')
  getAllEmployees():Promise<Employee[]> {
    return this.employeeService.getAll();
  }
}
