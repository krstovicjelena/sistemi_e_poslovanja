import * as Validator from 'class-validator';

export class AddFireDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(13)
    umcn:string;

    @Validator.IsString()
    @Validator.Matches(/^[a-zA-Z0-9\s,'-.]*$/)
    @Validator.Length(0,255)
    address:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces: 2
    })
    area:number;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces: 0    
  
    })
    yearOfConstruction:number;

    @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10,60)
    riskAssesment:string;


    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10)  
    startsAt:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(10)
    expiresAt:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces: 2
    })
    price:number;

    @Validator.IsString()
    @Validator.Length(0,512)
    condition:string;
    
}