export class AddCropPolicyDto{
    clientId:number;
    startsAt:string;
    expiresAt:string;
    price:number;
    condition:string;
    crops:{
        typeOfCropId : number;
        areaUnderCulture:number
    }[]

}