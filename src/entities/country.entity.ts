import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { TravelInsurancePolicyCountry } from "./travelInsurancePolicy-country.entity";
import { TravelInsurancePolicy } from "./travelInsurancePolicy.entity";

@Index("uq_country_name", ["name"], { unique: true })
@Entity("country")
export class Country {
  @PrimaryGeneratedColumn({ type: "int", name: "country_id", unsigned: true })
  countryId: number;

  @Column({ type: "varchar", unique: true, length: 128 })
  name: string;

   
  @ManyToMany(type =>TravelInsurancePolicy,travel_insurance_policy=>travel_insurance_policy.countries)
  @JoinTable({
    name:"travel_insurance_policy_country",
    joinColumn:{name:"country_id", referencedColumnName: "countryId"},
    inverseJoinColumn:{name:"travel_insurance_policy_id", referencedColumnName: "travelInsurancePolicyId"}
    
  })
  policies: TravelInsurancePolicy[];

  @OneToMany(
    () => TravelInsurancePolicyCountry,
    (travelInsurancePolicyCountry) => travelInsurancePolicyCountry.country
  )
  travelInsurancePolicyCountries: TravelInsurancePolicyCountry[];
}
