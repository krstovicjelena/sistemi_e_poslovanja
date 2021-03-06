import * as Validator from 'class-validator';
import { CropComponentDto } from './crop.component.dto';
import { IsArray, Validate, ValidateNested } from 'class-validator';
export class AddCropPolicyDto{
    
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

    @Validator.IsArray()
    @Validator.ValidateNested({
        always:true //validiraj sve u nizu
    })
    crops:CropComponentDto[]

}