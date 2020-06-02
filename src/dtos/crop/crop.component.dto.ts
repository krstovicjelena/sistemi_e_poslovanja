import * as Validator from 'class-validator';
export class CropComponentDto{
    typeOfCropId : number;
    
    @Validator.IsNotEmpty()
    @Validator.IsPositive()
    @Validator.IsNumber({
      allowInfinity:false,
      allowNaN: false,
      maxDecimalPlaces: 2
    })
    areaUnderCulture:number
}