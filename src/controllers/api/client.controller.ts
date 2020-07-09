import { Controller, Put, Body, Post, Param, Patch } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Client } from "src/entities/client.entity";
import { ClientService } from "src/services/client/client.service";
import { AddClientDto } from "src/dtos/client/add.client.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { EditClientDto } from "src/dtos/client/edit.client.dto";

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
    },
    routes:{
        only:[
            "createOneBase",
            "createManyBase",
            "getManyBase",
            "getOneBase"
        ]
    }
})
export class ClientController{
    constructor(public service: ClientService){}

    @Post()
    add(@Body() data:AddClientDto): Promise<Client|ApiResponse>{
        return this.service.createClient(data);

    }

    @Patch(':id')
    edit(@Param('id') id:number, @Body() data:EditClientDto):Promise<Client|ApiResponse>{
        return this.service.editById(id,data);
    }
}