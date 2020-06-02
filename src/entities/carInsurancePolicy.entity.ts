import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";
import * as Validator from 'class-validator';


@Index(
  "uq_car_insurance_policy_vin_registration_number",
  ["vin", "registrationNumber"],
  { unique: true }
)
@Index("fk_car_insurance_policy_client_id", ["clientId"], {})
@Entity("car_insurance_policy")
export class CarInsurancePolicy {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "car_insurance_policy_id",
    unsigned: true,
  })
  carInsurancePolicyId: number;

  @Column( { type: "int", name: "client_id", unsigned: true })
  clientId: number;

  @Column({  type: "varchar", length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,255)
  manufacturer: string;

  @Column( { type: "varchar", length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1,128)
  model: string;

  @Column({ type: "int", name: "year_of_production"})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces:0
  })
  yearOfProduction: number;

  @Column({  type: "varchar", length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(17,255)
  vin: string;

  @Column({ type: "int", name: "milage"})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces:0
  })
  milage: number;

  @Column({  type: "varchar",name: "registration_number"})
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Matches(/^[A-Z]{2}\-[0-9][1-9]{3,5}\-[A-Z]{2}$/)
  @Validator.Length(9,12)
  registrationNumber: string;

  @Column({ type: "date", name: "starts_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  startsAt: string;

  @Column({  type: "date",name: "expires_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  expiresAt: string;

  @Column({ type: "double", precision: 22,scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  price: number;

  @Column({type: "text", nullable: true })
  @Validator.IsString()
  @Validator.Length(0,512)
  condition: string | null;

  @ManyToOne(() => Client, (client) => client.carInsurancePolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;
}
