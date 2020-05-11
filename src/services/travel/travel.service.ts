import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TravelInsurancePolicy } from "entities/travelInsurancePolicy.entity";
import { AddTravelPolicyDto } from "src/dtos/travel/add.travel.dto";
import { TravelInsurancePolicyCountry } from "entities/travelInsurancePolicy-country.entity";
import { ApiResponse } from "src/misc/api.response.class";
import { Country } from "entities/country.entity";

@Injectable()
export class TravelService extends TypeOrmCrudService<TravelInsurancePolicy>{
    constructor(
        @InjectRepository(TravelInsurancePolicy) private readonly travel: Repository<TravelInsurancePolicy>,
        @InjectRepository(Country) private readonly country: Repository<Country>,
        @InjectRepository(TravelInsurancePolicyCountry) private readonly tipCountry: Repository<TravelInsurancePolicyCountry> // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(travel); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }

   async createfullTravelPolicy(data:AddTravelPolicyDto):Promise<TravelInsurancePolicy|ApiResponse>{
       let newTravelPolicy:TravelInsurancePolicy = new TravelInsurancePolicy();
       newTravelPolicy.clientId = data.clientId;
       newTravelPolicy.startsAt = data.startsAt;
       newTravelPolicy.expiresAt = data.expiresAt;
       newTravelPolicy.condition = data.condition;
       newTravelPolicy.price = data.price;

       let savedTravelPolicy=await this.travel.save(newTravelPolicy);


    for(let c of data.countries){
       let newTipCountry: TravelInsurancePolicyCountry= new TravelInsurancePolicyCountry();
       newTipCountry.travelInsurancePolicyId=savedTravelPolicy.travelInsurancePolicyId;
       newTipCountry.countryId= c.countryId;
       newTipCountry.type=c.type;

       await this.tipCountry.save(newTipCountry);
        
    }

    return await this.travel.findOne(savedTravelPolicy.travelInsurancePolicyId,{
        relations:["client","countries","travelInsurancePolicyCountries"] //kako bih sada ovde uvezala da mi se prikazuje i country

    })
       



       
   }
}