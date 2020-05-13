import { Controller, Get } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AccidentPolicy } from "src/entities/accidentPolicy.entity";
import { AccidentService } from "src/services/accident/accident.service";

@Controller('api/accident')
@Crud({
    model:{
        type:AccidentPolicy
    },
    params:{
        id:{
            field:'accidentPolicyId',  
            type:'number',
            primary:true      }
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
export class AccidentController{
    constructor(public service:AccidentService){}

    @Get()
    getAll():Promise<AccidentPolicy[]>{
        return this.service.getAll();
    }
}