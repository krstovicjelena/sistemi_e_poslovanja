import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { CropInsurancePolicy } from "src/entities/cropInsurancePolicy.entity";
import { CropService } from "src/services/crop/crop.service";
import { AddCropPolicyDto } from "src/dtos/crop/add.crop.dto";


@Controller('api/crop')
@Crud({
    model:{
        type: CropInsurancePolicy
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'cropInsurancePolicyId',
            type: 'number',
            primary: true
        }
    },
    routes:{
        only:[ //dopustanje samo odredjenih ruta a ne svih koje pruza crud
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase"
        ]
    }
   
    
})
export class CropController{
    constructor(public service: CropService){}

    @Post('createFull')
    createfull(@Body() data:AddCropPolicyDto){
        return this.service.createfullCropPolicy(data);
    }
}