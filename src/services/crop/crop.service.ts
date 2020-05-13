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

@Injectable()
export class CropService extends TypeOrmCrudService<CropInsurancePolicy>{
    constructor(
        @InjectRepository(CropInsurancePolicy) private readonly crop: Repository<CropInsurancePolicy>,
        @InjectRepository(CropInsurancePolicyTypeOfCrop) private readonly cipto: Repository<CropInsurancePolicyTypeOfCrop>,
       // mora da se evidentira u app modulu svaki repoziturijum
    ){
        super(crop); //moramo da ga prosledimo super klasi TypeOrmCrudService
    }

   async createfullCropPolicy(data:AddCropPolicyDto):Promise<CropInsurancePolicy|ApiResponse>{
       let newCropPolicy:CropInsurancePolicy = new CropInsurancePolicy();
       newCropPolicy.clientId = data.clientId;
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