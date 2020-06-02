import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country.entity";
import { TravelInsurancePolicy } from "./travelInsurancePolicy.entity";
import * as Validator from 'class-validator';

@Index(
  "fk_travel_insurance_policy_country_travel_insurance_policy_id",
  ["travelInsurancePolicyId"],
  {}
)
@Index("fk_travel_insurance_policy_country_country_id", ["countryId"], {})
@Entity("travel_insurance_policy_country")
export class TravelInsurancePolicyCountry {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "travel_insurance_policy_country_id",
    unsigned: true,
  })
  travelInsurancePolicyCountryId: number;

  @Column( {  type: "int",name: "travel_insurance_policy_id", unsigned: true })
  travelInsurancePolicyId: number;

  @Column({  type: "int",name: "country_id", unsigned: true })
  countryId: number;

  @Column( { type: "enum",
    enum: ["starting_point", "destination", "transit"],
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(["starting_point", "destination", "transit"])
  type: "starting_point" | "destination" | "transit";

  @ManyToOne(
    () => Country,
    (country) => country.travelInsurancePolicyCountries,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "country_id", referencedColumnName: "countryId" }])
  country: Country;

  @ManyToOne(
    () => TravelInsurancePolicy,
    (travelInsurancePolicy) =>
      travelInsurancePolicy.travelInsurancePolicyCountries,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "travel_insurance_policy_id",
      referencedColumnName: "travelInsurancePolicyId",
    },
  ])
  travelInsurancePolicy: TravelInsurancePolicy;
}
