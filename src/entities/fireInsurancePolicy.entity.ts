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

@Index("fk_fire_insurance_policy_client_id", ["clientId"], {})
@Entity("fire_insurance_policy")
export class FireInsurancePolicy {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "fire_insurance_policy_id",
    unsigned: true,
  })
  fireInsurancePolicyId: number;

  @Column({ type: "int",name: "client_id", unsigned: true })
  clientId: number;

  @Column( {type: "varchar", length: 255 })
  @Validator.IsString()
  @Validator.Matches(/^[a-zA-Z0-9\s,'-.]*$/)
  @Validator.Length(0,255)
  address: string;

  @Column( {type: "double", precision: 22 , scale:2})
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  area: number;

  @Column( { type: "int",name: "year_of_construction" })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 0    

  })
  yearOfConstruction: number;

  @Column({ type: "text",name: "risk_assesment" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10,60)
  riskAssesment: string;

  @Column({ type: "date",name: "starts_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  startsAt: string;

  @Column( { type: "date",name: "expires_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  expiresAt: string;

  @Column({type: "text",nullable: true })
  @Validator.IsString()
  @Validator.Length(0,512)
  condition: string | null;

  @Column({type: "double", precision: 22, scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  price: number;

  @ManyToOne(() => Client, (client) => client.fireInsurancePolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;
}
