import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccidentPolicy } from "./accidentPolicy.entity";
import { CarInsurancePolicy } from "./carInsurancePolicy.entity";
import { CropInsurancePolicy } from "./cropInsurancePolicy.entity";
import { FireInsurancePolicy } from "./fireInsurancePolicy.entity";
import { TravelInsurancePolicy } from "./travelInsurancePolicy.entity";

@Index("uq_insured_umcn", ["umcn"], { unique: true })
@Index("uq_insured_email", ["email"], { unique: true })
@Entity("client")
export class Client {
  @PrimaryGeneratedColumn({ type: "int", name: "client_id", unsigned: true })
  clientId: number;

  @Column({type:"varchar", unique: true, length: 13 })
  umcn: string;

  @Column( { type:"varchar", length: 60 })
  forename: string;

  @Column({ type:"varchar", length: 60 })
  surname: string;

  @Column( { type:"varchar", nullable: true, length: 20 })
  phone: string | null;

  @Column( { type:"varchar", unique: true, length: 255 })
  email: string;

  @Column( { type:"varchar",nullable: true, length: 255 })
  address: string | null;

  @OneToMany(() => AccidentPolicy, (accidentPolicy) => accidentPolicy.client)
  accidentPolicies: AccidentPolicy[];

  @OneToMany(
    () => CarInsurancePolicy,
    (carInsurancePolicy) => carInsurancePolicy.client
  )
  carInsurancePolicies: CarInsurancePolicy[];

  @OneToMany(
    () => CropInsurancePolicy,
    (cropInsurancePolicy) => cropInsurancePolicy.client
  )
  cropInsurancePolicies: CropInsurancePolicy[];

  @OneToMany(
    () => FireInsurancePolicy,
    (fireInsurancePolicy) => fireInsurancePolicy.client
  )
  fireInsurancePolicies: FireInsurancePolicy[];

  @OneToMany(
    () => TravelInsurancePolicy,
    (travelInsurancePolicy) => travelInsurancePolicy.client
  )
  travelInsurancePolicies: TravelInsurancePolicy[];
}
