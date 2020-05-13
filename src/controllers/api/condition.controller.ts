import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Condition } from "src/entities/condition.entity";
import { ConditionService } from "src/services/condition/condition.service";

@Controller('api/condition')
@Crud({
    model:{
        type: Condition
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'conditionId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            accidentPolicies:{
                eager:false
            }

        }
    },
    routes:{
        only:[
            "createOneBase",
            "createManyBase"
          
           
        ]
    }
})
export class ConditionController{
    constructor(public service: ConditionService){}
}