import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CropInsurancePolicy } from "src/entities/cropInsurancePolicy.entity";
import { AddCropPolicyDto } from "src/dtos/crop/add.crop.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { Country } from "src/entities/country.entity";
import { TypeOfCrop } from "src/entities/typeOfCrop.entity";
import { CropInsurancePolicyTypeOfCrop } from "src/entities/cropInsurancePolicy-typeOfCrop.entity";
import { Client } from "src/entities/client.entity";

@Injectable()
export class CropService extends TypeOrmCrudService<CropInsurancePolicy>{
    constructor(
        @InjectRepository(CropInsurancePolicy) private readonly crop: Repository<CropInsurancePolicy>,
        @InjectRepository(CropInsurancePolicyTypeOfCrop) private readonly cipto: Repository<CropInsurancePolicyTypeOfCrop>,
        @InjectRepository(Client) private readonly client: Repository<Client>

       // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(crop); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }

   async createfullCropPolicy(data:AddCropPolicyDto):Promise<CropInsurancePolicy|ApiResponse>{
    let c= await this.client.findOne({where:{umcn:data.umcn}});
        
    if(c === undefined){
        return new Promise((resolve)=>{
            resolve(new ApiResponse("error",-1004,"Ne postoji klijent sa unetim maticnim brojem, morate uneti podatke o klijentu u sistem"));
        })
    }
       let newCropPolicy:CropInsurancePolicy = new CropInsurancePolicy();
       newCropPolicy.clientId = c.clientId;
       newCropPolicy.startsAt = data.startsAt;
       newCropPolicy.expiresAt = data.expiresAt;
       newCropPolicy.condition = data.condition;
       newCropPolicy.price = data.price;

       let savedCropPolicy=await this.crop.save(newCropPolicy);


    for(let c of data.crops){
       let newCipToc: CropInsurancePolicyTypeOfCrop= new CropInsurancePolicyTypeOfCrop();
       newCipToc.cropInsurancePolicyId=savedCropPolicy.cropInsurancePolicyId;
       newCipToc.typeOfCropId= c.typeOfCropId;
       newCipToc.areaUnderCulture=c.areaUnderCulture;

       await this.cipto.save(newCipToc);
        
    }
    return await this.crop.findOne(savedCropPolicy.cropInsurancePolicyId,{
        relations:["client"] 

    })
       



       
   }
}