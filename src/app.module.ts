import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfiguration } from './config/database.configuration';
import { Employee } from 'entities/employee.entity';
import { EmployeeService } from './services/employee/employee.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [Employee]
    }),
    TypeOrmModule.forFeature([Employee])
  ],
  controllers: [AppController],
  providers: [EmployeeService],
})
export class AppModule {}
