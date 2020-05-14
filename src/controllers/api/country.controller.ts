import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Country } from "src/entities/country.entity";
import { CountryService } from "src/services/country/country.service";

@Controller('api/country')
@Crud({
    model:{
        type: Country
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'countryId',
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
            "updateOneBase",
            
          
           
        ]
    }
})
export class CountryController{
    constructor(public service: CountryService){}
}