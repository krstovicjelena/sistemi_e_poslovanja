import { Controller, Put, Body } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { CarInsurancePolicy } from "src/entities/carInsurancePolicy.entity";
import { CarService } from "src/services/car/car.service";
import { AddCarDto } from "src/dtos/car/add.car.dto";
import { ApiResponse } from "src/misc/api.response.class";

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
    },
    routes:{
        only:[
            "getManyBase",
            "getOneBase"
        ]
    }
})
export class CarController{
    constructor(public service: CarService){}
    @Put()
    add(@Body() data:AddCarDto): Promise<CarInsurancePolicy|ApiResponse>{
        return this.service.createFullCar(data);

    }
}