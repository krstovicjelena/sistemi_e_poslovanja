import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AccidentPolicy } from "src/entities/accidentPolicy.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AccidentService extends TypeOrmCrudService<AccidentPolicy>{
    constructor(
        @InjectRepository(AccidentPolicy) private readonly accident:Repository<AccidentPolicy>
    ){
        super(accident);
    }

    getAll():Promise<AccidentPolicy[]>{
        return this.accident.find();
    }
}
