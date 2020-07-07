export class LoginInfoEmployeeDto{
    employeeId:number;
    username:string;
    token:string;
    refreshToken:string;
    refreshTokenExpiresAt:string;


    constructor(id:number,un:string,jwt:string,refreshToken:string,refreshTokenExpiresAt:string
        ){
        this.employeeId=id;
        this.username=un;
        this.token=jwt;
        this.refreshToken=refreshToken;
        this.refreshTokenExpiresAt=refreshTokenExpiresAt;

    }

}