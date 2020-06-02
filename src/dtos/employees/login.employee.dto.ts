import * as Validator from 'class-validator';

export class LoginEmployeeDto{
  @Validator.IsNotEmpty() //ako bude prazan izuzetak bad request dolazi do njega ako su poslati podaci ali nisu formirani na ispravan nacin
  @Validator.IsString()
  @Validator.Matches(/^[a-z][a-z0-9\.]{3,60}$/)
  @Validator.Length(3,60)
    username: string;

  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(6,128)
    password: string;
}