import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Client } from "./client.entity";
import { TravelInsurancePolicyCountry } from "./travelInsurancePolicy-country.entity";
import { Country } from "./country.entity";
import * as Validator from 'class-validator';

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
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)

  startsAt: string;

  @Column({type: "date", name: "expires_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)

  expiresAt: string;

  @Column({type: "text", nullable: true })
  @Validator.IsString()
  @Validator.Length(0,512)
  condition: string | null;

  @Column({ type: "double", precision: 22,scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  price: number;

  

  @ManyToMany(type =>Country,country=>country.policies)
  @JoinTable({
    name:"travel_insurance_policy_country",
    joinColumn:{name:"travel_insurance_policy_id", referencedColumnName: "travelInsurancePolicyId"},
    inverseJoinColumn:{name:"country_id", referencedColumnName: "countryId"}
    
  })
  countries: Country[];

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
