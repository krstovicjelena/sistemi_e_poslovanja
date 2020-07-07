import * as Validator from 'class-validator';
export class EmployeeRefreshTokenDto{

    @Validator.IsNotEmpty()
    token:string;
}