import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Client } from "entities/client.entity";
import { ClientService } from "src/services/client/client.service";

@Controller('api/client')
@Crud({
    model:{
        type: Client
    },
    params: { //mora ovako jer crud zahteva da se zove samo id
        id:{
            field: 'clientId',
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
    }
})
export class ClientController{
    constructor(public service: ClientService){}
}