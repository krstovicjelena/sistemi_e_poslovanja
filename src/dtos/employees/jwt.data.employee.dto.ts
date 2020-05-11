export class JwtDataEmployeeDto{
    employeeId:number;
    username:string;
    exp:number;
    ip:string;
    ua:string;

    toPlainObject(){
        return{
            employeeId:this.employeeId,
            username:this.username,
            exp:this.exp,
            ip:this.ip,
            ua:this.ua
        }
    }
}