import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { TypeOfCrop } from "src/entities/typeOfCrop.entity";
import { TypeOfCropService } from "src/services/typeOfCrop/typeOfCrop.service";

@Controller('api/typeOfCrop')
@Crud({
    model:{
        type: TypeOfCrop
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'typeOfCropId',
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
            "createManyBase",
            "getManyBase",
            "getOneBase",
            "updateOneBase"
          
           
        ]
    }
})
export class TypeOfCropController{
    constructor(public service: TypeOfCropService){}
}