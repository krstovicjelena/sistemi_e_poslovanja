import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Country } from "src/entities/country.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from "typeorm";

@Injectable()
export class CountryService extends TypeOrmCrudService<Country>{
    constructor(
        @InjectRepository(Country) private readonly c: Repository<Country> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(c); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }
}