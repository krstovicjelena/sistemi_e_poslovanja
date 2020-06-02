
import * as Validator from 'class-validator';
import { TravelComponentDto } from './travel.component.dto';

export class AddTravelPolicyDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(13)
    umcn:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10)
    startsAt:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10)
    expiresAt:string;

    @Validator.IsString()
    @Validator.Length(0,512)
    condition:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces: 2
    })
    price:number;

    @Validator.IsArray()
    @Validator.ValidateNested({
        always:true //validiraj sve u nizu
    })
    countries:TravelComponentDto[];


}

/*{
    "clientId" : 1,
    "startsAt": 25-5-2020,
    "expiresAt": 28-09-1985,
    "condition": "sdasjhdasasd",
    "price": 158963,
    "countries" : [
        {"countryId":2, "name":"Srbija" , "type":"transit"}
        {"countryId":1, "name":"Srbija" , "type":"transit"}
    ]



}*/