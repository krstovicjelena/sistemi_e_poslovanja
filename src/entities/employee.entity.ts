import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';
@Index("uq_employee_username", ["username"], { unique: true })
@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_id", unsigned: true })
  employeeId: number;

  @Column({type: "varchar", unique: true, length: 60 })
  @Validator.IsNotEmpty() //ako bude prazan izuzetak bad request dolazi do njega ako su poslati podaci ali nisu formirani na ispravan nacin
  @Validator.IsString()
  @Validator.Matches(/^[a-z][a-z0-9\.]{3,60}$/)
  @Validator.Length(3,60)
  username: string;

  @Column( { type: "varchar",name: "password_hash", length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsHash('sha512')
  passwordHash: string;
}
