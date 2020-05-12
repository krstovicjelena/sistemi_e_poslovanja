import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
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
import { ClientService } from './services/client/client.service';
import { ClientController } from './controllers/api/client.controller';
import { TravelService } from './services/travel/travel.service';
import { TravelController } from './controllers/api/travel.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';


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
      Employee,
      Client,
      TravelInsurancePolicy,
      TravelInsurancePolicyCountry,
      Country
    ])
  ],
  controllers: [
    AppController,
    EmployeeController,
    ClientController,
    TravelController,
  AuthController],
  providers: [
    EmployeeService,
    ClientService,
    TravelService
  ],
  exports: [
    EmployeeService //moramo ovde da ga dodamo da bi bio dostupan AuthMiddleware dole
  ]
})
export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*').forRoutes('api/*'); 
    //primeni ovaj mw na sve rute api/*, ali nemoj na auth/* jer nikad ne bismo dobili token

  }
}
