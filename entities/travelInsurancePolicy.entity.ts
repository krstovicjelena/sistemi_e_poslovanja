import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { TravelInsurancePolicyCountry } from "./travelInsurancePolicy-country.entity";

@Index("fk_travel_insurance_policy_client_id", ["clientId"], {})
@Entity("travel_insurance_policy")
export class TravelInsurancePolicy {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "travel_insurance_policy_id",
    unsigned: true,
  })
  travelInsurancePolicyId: number;

  @Column({type: "int", name: "client_id", unsigned: true })
  clientId: number;

  @Column( { type: "date",name: "starts_at" })
  startsAt: string;

  @Column({type: "date", name: "expires_at" })
  expiresAt: string;

  @Column( { type: "text", nullable: true })
  condition: string | null;

  @Column( {type: "double", precision: 22 })
  price: number;

  @ManyToOne(() => Client, (client) => client.travelInsurancePolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;

  @OneToMany(
    () => TravelInsurancePolicyCountry,
    (travelInsurancePolicyCountry) =>
      travelInsurancePolicyCountry.travelInsurancePolicy
  )
  travelInsurancePolicyCountries: TravelInsurancePolicyCountry[];
}
