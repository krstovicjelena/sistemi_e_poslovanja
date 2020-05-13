import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FireInsurancePolicy } from "src/entities/fireInsurancePolicy.entity";
import { FireService } from "src/services/fire/fire.service";


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
        "createOneBase",
        "createManyBase",
        "getManyBase",
        "getOneBase"
    ]
}
    
})
export class FireController{
    constructor(public service: FireService){}

   
}