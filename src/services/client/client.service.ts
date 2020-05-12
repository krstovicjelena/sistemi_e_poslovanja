import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Client } from "src/entities/client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClientService extends TypeOrmCrudService<Client>{
    constructor(
        @InjectRepository(Client) private readonly client: Repository<Client> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(client); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }
}