import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';

@Entity("employee_token")
export class EmployeeToken {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_token_id", unsigned: true })
  employeeTokenId: number;

 @Column({ type: "int", name: "employee_id", unsigned: true })
 employeeId: number;

  @Column( { type:"text" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  token: string;

  @Column( {
    type:"timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: string;

  @Column( {  type: "tinyint",name: "is_valid", unsigned: true,default:1})
  @Validator.IsNotEmpty()
  @Validator.IsIn([0,1])
  isValid: number;
  
  @Column( {
    type:"datetime",
    name: "expires_at"
  })
  expiresAt: string;

}
