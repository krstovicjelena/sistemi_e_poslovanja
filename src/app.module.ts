import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfiguration } from './config/database.configuration';
import { Employee } from '../entities/employee.entity';
import { EmployeeService } from './services/employee/employee.service';
import { CarInsurancePolicy } from '../entities/carInsurancePolicy.entity';
import { Client } from '../entities/client.entity';
import { Condition } from '../entities/condition.entity';
import { Country } from '../entities/country.entity';
import { CropInsurancePolicy } from '../entities/cropInsurancePolicy.entity';
import { CropInsurancePolicyTypeOfCrop } from '../entities/cropInsurancePolicy-typeOfCrop.entity';
import { FireInsurancePolicy } from '../entities/fireInsurancePolicy.entity';
import { TravelInsurancePolicy } from '../entities/travelInsurancePolicy.entity';
import { TravelInsurancePolicyCountry } from '../entities/travelInsurancePolicy-country.entity';
import { TypeOfCrop } from '../entities/typeOfCrop.entity';
import { AccidentPolicy } from '../entities/accidentPolicy.entity';
import { EmployeeController } from './controllers/api/employee.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Employee,
        CarInsurancePolicy,
        Client,
        Condition,
        Country,
        CropInsurancePolicy,
        CropInsurancePolicyTypeOfCrop,
        FireInsurancePolicy,
        TravelInsurancePolicy,
        TravelInsurancePolicyCountry,
        TypeOfCrop,
        AccidentPolicy
      ]
    }),
    TypeOrmModule.forFeature([
      Employee
    ])
  ],
  controllers: [
    AppController,
  EmployeeController],
  providers: [EmployeeService],
})
export class AppModule {}
