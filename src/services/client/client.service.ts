import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Client } from "src/entities/client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddClientDto } from "src/dtos/client/add.client.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditClientDto } from "src/dtos/client/edit.client.dto";

@Injectable()
export class ClientService extends TypeOrmCrudService<Client>{
    constructor(
        @InjectRepository(Client) private readonly client: Repository<Client> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(client); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }

    async createClient(data:AddClientDto):Promise<Client|ApiResponse>{
        let c= await this.client.findOne({where:{umcn:data.umcn}});
        
        if(c !== undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1004,"Vec postoji klijent sa unetim maticnim brojem"));
            })
        }

        let newClient:Client=new Client();
        newClient.umcn=data.umcn;
        newClient.forename=data.forename;
        newClient.surname=data.surname;
        newClient.phone=data.phone;
        newClient.email=data.email;
        newClient.address=data.address;



        return new Promise ((resolve)=> {
            this.client.save(newClient)
            .then(data=>resolve(data))
            .catch(error=>{
                const response: ApiResponse = new ApiResponse("error",-1010,"Nesto nije ok sa kreiranjem klijenta");
                resolve(response);
            });
        });

    }

    async editById(id:number,data:EditClientDto):Promise<Client|ApiResponse>{
        let c= await this.client.findOne(id);

        if(c === undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1002,"Ne postoji klijent sa ovim id-jem"));
            })
        }

        c.surname=data.surname;
        c.phone=data.phone;
        c.email=data.email;
        c.address=data.address;

        return this.client.save(c); 


    }

}