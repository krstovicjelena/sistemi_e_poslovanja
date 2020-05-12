import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FireInsurancePolicy } from "src/entities/fireInsurancePolicy.entity";
import { ApiResponse } from "src/misc/api.response.class";


@Injectable()
export class FireService extends TypeOrmCrudService<FireInsurancePolicy>{
    constructor(
        @InjectRepository(FireInsurancePolicy) private readonly fire: Repository<FireInsurancePolicy>,
 // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(fire); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }}