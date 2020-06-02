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

@Index("fk_accidend_policy_client_id", ["clientId"], {})
@Entity("accident_policy")
export class AccidentPolicy {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "accident_policy_id",
    unsigned: true,
  })
  accidentPolicyId: number;

  @Column({ type: "int",name: "client_id", unsigned: true })
  clientId: number;

  @Column({  type: "date", name: "starts_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  startsAt: string;

  @Column({ type: "date",name: "expires_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  expiresAt: string;

  @Column({ type: "double", precision: 22, scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  price: number;

  @Column({  type: "text", nullable: true })
  @Validator.IsString()
  @Validator.Length(0,512)
  condition: string | null;

  @ManyToOne(() => Client, (client) => client.accidentPolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;
}
