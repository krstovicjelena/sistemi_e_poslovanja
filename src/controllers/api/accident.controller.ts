import { Controller, Get, Put, Body, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AccidentPolicy } from "src/entities/accidentPolicy.entity";
import { AccidentService } from "src/services/accident/accident.service";
import { AddAccidentDto } from "src/dtos/accident/add.accident.dto";
import { ApiResponse } from "src/misc/api.response.class";

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
export class AccidentController{
    constructor(public service:AccidentService){}

   


    @Post()
    add(@Body() data:AddAccidentDto): Promise<AccidentPolicy|ApiResponse>{
        return this.service.createFullAccident(data);

    }
}