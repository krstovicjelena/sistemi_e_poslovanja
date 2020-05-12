import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { CarInsurancePolicy } from "src/entities/carInsurancePolicy.entity";
import { CarService } from "src/services/car/car.service";

@Controller('api/car')
@Crud({
    model:{
        type: CarInsurancePolicy
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'carInsurancePolicyId',
            type: 'number',
            primary: true
        }
    },
    query:{
        join:{
            client:{
                eager:false
            }

        }
    }
})
export class CarController{
    constructor(public service: CarService){}
}