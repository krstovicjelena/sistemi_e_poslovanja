import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CarInsurancePolicy } from "src/entities/carInsurancePolicy.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "src/entities/client.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { AddCarDto } from "src/dtos/car/add.car.dto";

@Injectable()
export class CarService extends TypeOrmCrudService<CarInsurancePolicy>{
    constructor(
        @InjectRepository(CarInsurancePolicy) private readonly car: Repository<CarInsurancePolicy>,
        @InjectRepository(Client) private readonly client:Repository<Client>// mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(car); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }

    async createFullCar(data:AddCarDto):Promise<CarInsurancePolicy|ApiResponse>{

        let c= await this.client.findOne({where:{umcn:data.umcn}});
        
        if(c === undefined){
            return new Promise((resolve)=>{
                resolve(new ApiResponse("error",-1004,"Ne postoji klijent sa unetim maticnim brojem, morate uneti podatke o klijentu u sistem"));
            })
        }

        let newCar:CarInsurancePolicy=new CarInsurancePolicy();
        newCar.clientId=c.clientId;
        newCar.manufacturer=data.manufacturer;
        newCar.milage=data.milage;
        newCar.model=data.model;
        newCar.registrationNumber=data.registrationNumber;
        newCar.vin=data.vin;
        newCar.yearOfProduction=data.yearOfProduction;
        newCar.startsAt=data.startsAt;
        newCar.expiresAt=data.expiresAt;
        newCar.price=data.price;
        newCar.condition=data.condition;


        return new Promise ((resolve)=> {
            this.car.save(newCar)
            .then(data=>resolve(data))
            .catch(error=>{
                const response: ApiResponse = new ApiResponse("error",-1005,"Nesto nije ok sa kreiranjem kasko polise");
                resolve(response);
            });
        });

    }
}