import { Controller, Post, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TravelInsurancePolicy } from "entities/travelInsurancePolicy.entity";
import { TravelService } from "src/services/travel/travel.service";
import { AddTravelPolicyDto } from "src/dtos/travel/add.travel.dto";

@Controller('api/travel')
@Crud({
    model:{
        type: TravelInsurancePolicy
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'travelInsurancePolicyId',
            type: 'number',
            primary: true
        }
    },
   
    
})
export class TravelController{
    constructor(public service: TravelService){}

    @Post('createFull')
    createfull(@Body() data:AddTravelPolicyDto){
        return this.service.createfullTravelPolicy(data);
    }
}