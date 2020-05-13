

export class AddTravelPolicyDto{
    clientId:number;
    startsAt:string;
    expiresAt:string;
    condition:string;
    price:number;
    countries:{
        countryId : number;
        type : 'starting_point' | 'destination' | 'transit'
    }[]


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