import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Condition } from "src/entities/condition.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from "typeorm";

@Injectable()
export class ConditionService extends TypeOrmCrudService<Condition>{
    constructor(
        @InjectRepository(Condition) private readonly c: Repository<Condition> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(c); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }
}