import { Controller, Put, Body, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FireInsurancePolicy } from "src/entities/fireInsurancePolicy.entity";
import { FireService } from "src/services/fire/fire.service";
import { AddFireDto } from "src/dtos/fire/add.fire.dto";
import { ApiResponse } from "src/misc/api.response.class";


@Controller('api/fire')
@Crud({
    model:{
        type: FireInsurancePolicy
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'fireInsurancePolicyId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            client:{
                eager:true
            }
        }
        
},
routes:{
    only:[
        "getManyBase",
        "getOneBase"
    ]
}
    
})
export class FireController{
    constructor(public service: FireService){}

    @Post()
    add(@Body() data:AddFireDto): Promise<FireInsurancePolicy|ApiResponse>{
        return this.service.createFullFire(data);

    }
}