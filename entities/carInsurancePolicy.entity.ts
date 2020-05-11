import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";

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
  manufacturer: string;

  @Column( { type: "varchar", length: 128 })
  model: string;

  @Column({ type: "int", name: "year_of_production"})
  yearOfProduction: number;

  @Column({  type: "varchar", length: 255 })
  vin: string;

  @Column({ type: "int", name: "milage"})
  milage: number;

  @Column({  type: "int",name: "registration_number"})
  registrationNumber: string;

  @Column({ type: "date", name: "starts_at" })
  startsAt: string;

  @Column({  type: "date",name: "expires_at" })
  expiresAt: string;

  @Column({ type: "double", precision: 22 })
  price: number;

  @Column({type: "text", nullable: true })
  condition: string | null;

  @ManyToOne(() => Client, (client) => client.carInsurancePolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;
}
