export class JwtRefreshDataEmployeeDto{
    employeeId:number;
    username:string;
    exp:number;
    ip:string;
    ua:string;

    toPlainObject(){ //funkcija jwt.sign zahteva plain object kao argument
        return{
            employeeId:this.employeeId,
            username:this.username,
            exp:this.exp,
            ip:this.ip,
            ua:this.ua
        }
    }
}