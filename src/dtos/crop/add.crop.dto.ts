export class AddCropPolicyDto{
    umcn:string;
    startsAt:string;
    expiresAt:string;
    price:number;
    condition:string;
    crops:{
        typeOfCropId : number;
        areaUnderCulture:number
    }[]

}