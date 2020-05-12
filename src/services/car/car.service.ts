import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CarInsurancePolicy } from "src/entities/carInsurancePolicy.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CarService extends TypeOrmCrudService<CarInsurancePolicy>{
    constructor(
        @InjectRepository(CarInsurancePolicy) private readonly car: Repository<CarInsurancePolicy> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(car); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }
}