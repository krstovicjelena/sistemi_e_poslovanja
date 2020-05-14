import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AccidentPolicy } from "src/entities/accidentPolicy.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ApiResponse } from "src/misc/api.response.class";
import { Client } from "src/entities/client.entity";
import { AddAccidentDto } from "src/dtos/accident/add.accident.dto";

@Injectable()
export class AccidentService extends TypeOrmCrudService<AccidentPolicy>{
    constructor(
        @InjectRepository(AccidentPolicy) private readonly accident:Repository<AccidentPolicy>,
        @InjectRepository(Client) private readonly client:Repository<Client>
    ){
        super(accident);
    }

    getAll():Promise<AccidentPolicy[]>{
        return this.accident.find();
    }

    async createFullAccident(data:AddAccidentDto):Promise<AccidentPolicy|ApiResponse>{

        let c= await this.client.findOne({where:{umcn:data.umcn}});
        
        if(c === undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1004,"Ne postoji klijent sa unetim maticnim brojem, morate uneti podatke o klijentu u sistem"));
            })
        }

        let newAccident:AccidentPolicy=new AccidentPolicy();
        newAccident.clientId=c.clientId;
        newAccident.startsAt=data.startsAt;
        newAccident.expiresAt=data.expiresAt;
        newAccident.price=data.price;
        newAccident.condition=data.condition;


        return new Promise ((resolve)=> {
            this.accident.save(newAccident)
            .then(data=>resolve(data))
            .catch(error=>{
                const response: ApiResponse = new ApiResponse("error",-1005,"Nesto nije ok sa kreiranjem aciident polise");
                resolve(response);
            });
        });

    }

    
}
