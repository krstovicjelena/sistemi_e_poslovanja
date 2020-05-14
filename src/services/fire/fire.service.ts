import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FireInsurancePolicy } from "src/entities/fireInsurancePolicy.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { Client } from "src/entities/client.entity";
import { AddFireDto } from "src/dtos/fire/add.fire.dto";


@Injectable()
export class FireService extends TypeOrmCrudService<FireInsurancePolicy>{
    constructor(
        @InjectRepository(FireInsurancePolicy) private readonly fire: Repository<FireInsurancePolicy>,
         @InjectRepository(Client) private readonly client: Repository<Client>,
 // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(fire); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }
    async createFullFire(data:AddFireDto):Promise<FireInsurancePolicy|ApiResponse>{

        let c= await this.client.findOne({where:{umcn:data.umcn}});
        
        if(c === undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1004,"Ne postoji klijent sa unetim maticnim brojem, morate uneti podatke o klijentu u sistem"));
            })
        }

        let newFire:FireInsurancePolicy=new FireInsurancePolicy();
        newFire.clientId=c.clientId;
        newFire.address=data.address;
        newFire.area=data.area;
        newFire.riskAssesment=data.riskAssesment;
        newFire.yearOfConstruction=data.yearOfConstruction;
        newFire.startsAt=data.startsAt;
        newFire.expiresAt=data.expiresAt;
        newFire.price=data.price;
        newFire.condition=data.condition;


        return new Promise ((resolve)=> {
            this.fire.save(newFire)
            .then(data=>resolve(data))
            .catch(error=>{
                const response: ApiResponse = new ApiResponse("error",-1005,"Nesto nije ok sa kreiranjem kasko polise");
                resolve(response);
            });
        });

    }

}