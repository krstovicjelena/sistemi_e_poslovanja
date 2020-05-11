import { Controller, Get } from '@nestjs/common';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../../entities/employee.entity';




@Controller()
export class AppController {
  constructor(
    private employeeService:EmployeeService
  ){}


}
