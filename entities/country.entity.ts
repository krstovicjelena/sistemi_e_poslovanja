import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TravelInsurancePolicyCountry } from "./travelInsurancePolicy-country.entity";

@Index("uq_country_name", ["name"], { unique: true })
@Entity("country")
export class Country {
  @PrimaryGeneratedColumn({ type: "int", name: "country_id", unsigned: true })
  countryId: number;

  @Column({ type: "varchar", unique: true, length: 128 })
  name: string;

  @OneToMany(
    () => TravelInsurancePolicyCountry,
    (travelInsurancePolicyCountry) => travelInsurancePolicyCountry.country
  )
  travelInsurancePolicyCountries: TravelInsurancePolicyCountry[];
}
