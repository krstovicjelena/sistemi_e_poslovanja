import * as Validator from 'class-validator';

export class AddCarDto{
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(13)
    umcn:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(2,255)
    manufacturer:string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(1,128) 
    model:string;
    
    
    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces:0
    })
    yearOfProduction:number;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(17,255)    
    vin:string;

    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces:0
    })   
    milage:number;
    
    @Validator.IsNotEmpty()
    @Validator.IsString()
   
    @Validator.Length(9,12)
    registrationNumber:string;

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