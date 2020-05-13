import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { TypeOfCrop } from "src/entities/typeOfCrop.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from "typeorm";

@Injectable()
export class TypeOfCropService extends TypeOrmCrudService<TypeOfCrop>{
    constructor(
        @InjectRepository(TypeOfCrop) private readonly c: Repository<TypeOfCrop> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(c); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }
}