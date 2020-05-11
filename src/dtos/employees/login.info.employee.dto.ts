export class LoginInfoEmployeeDto{
    employeeId:number;
    username:string;
    token:string;

    constructor(id:number,un:string,jwt:string){
        this.employeeId=id;
        this.username=un;
        this.token=jwt;

    }

}