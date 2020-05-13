import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";

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
  address: string;

  @Column( {type: "double", precision: 22 })
  area: number;

  @Column( { type: "int",name: "year_of_construction" })
  yearOfConstruction: number;

  @Column({ type: "text",name: "risk_assesment" })
  riskAssesment: string;

  @Column({ type: "date",name: "starts_at" })
  startsAt: string;

  @Column( { type: "date",name: "expires_at" })
  expiresAt: string;

  @Column({type: "text",nullable: true })
  condition: string | null;

  @Column({type: "double", precision: 22 })
  price: number;

  @ManyToOne(() => Client, (client) => client.fireInsurancePolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;
}
