import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfiguration } from './config/database.configuration';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './services/employee/employee.service';
import { CarInsurancePolicy } from './entities/carInsurancePolicy.entity';
import { Client } from './entities/client.entity';
import { Condition } from './entities/condition.entity';
import { Country } from './entities/country.entity';
import { CropInsurancePolicy } from './entities/cropInsurancePolicy.entity';
import { CropInsurancePolicyTypeOfCrop } from './entities/cropInsurancePolicy-typeOfCrop.entity';
import { FireInsurancePolicy } from './entities/fireInsurancePolicy.entity';
import { TravelInsurancePolicy } from './entities/travelInsurancePolicy.entity';
import { TravelInsurancePolicyCountry } from './entities/travelInsurancePolicy-country.entity';
import { TypeOfCrop } from './entities/typeOfCrop.entity';
import { AccidentPolicy } from './entities/accidentPolicy.entity';
import { EmployeeController } from './controllers/api/employee.controller';
import { ClientService } from './services/client/client.service';
import { ClientController } from './controllers/api/client.controller';
import { TravelService } from './services/travel/travel.service';
import { TravelController } from './controllers/api/travel.controller';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { FireController } from './controllers/api/fire.controller';
import { FireService } from './services/fire/fire.service';
import { CarController } from './controllers/api/car.controller';
import { CarService } from './services/car/car.service';
import { AccidentService } from './services/accident/accident.service';
import { AccidentController } from './controllers/api/accident.controller';
import { CropController } from './controllers/api/crop.controller';
import { CropService } from './services/crop/crop.service';
import { ConditionService } from './services/condition/condition.service';
import { ConditionController } from './controllers/api/condition.controller';
import { CountryController } from './controllers/api/country.controller';
import { TypeOfCropController } from './controllers/api/typeOfcrop.controller';
import { CountryService } from './services/country/country.service';
import { TypeOfCropService } from './services/typeOfCrop/typeOfCrop.service';



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
      
    ])
  ],
  controllers: [
    AppController,
    EmployeeController,
    ClientController,
    TravelController,
    AuthController,
    FireController,
    CarController,
    AccidentController,
    CropController,
    ConditionController,
    CountryController,
    TypeOfCropController
  ],
  providers: [
    EmployeeService,
    ClientService,
    TravelService,
    FireService,
    CarService,
    AccidentService,
    CropService,
    ConditionService,
    CountryService,
    TypeOfCropService
    
  ],
  exports: [
    EmployeeService //moramo ovde da ga dodamo da bi bio dostupan AuthMiddleware dole
  ]
})
export class AppModule implements NestModule { //jedini nacin da koristimo mw je da implementriamo nestmodule interfejs
  configure(consumer:MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/*').forRoutes('api/*'); 
    //primeni ovaj mw na sve rute api/*, ali nemoj na auth/* jer nikad ne bismo dobili token

  }
}
