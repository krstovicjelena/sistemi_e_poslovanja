import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_employee_username", ["username"], { unique: true })
@Entity("employee")
export class Employee {
  @PrimaryGeneratedColumn({ type: "int", name: "employee_id", unsigned: true })
  employeeId: number;

  @Column({type: "varchar", unique: true, length: 60 })
  username: string;

  @Column( { type: "varchar",name: "password_hash", length: 255 })
  passwordHash: string;
}
