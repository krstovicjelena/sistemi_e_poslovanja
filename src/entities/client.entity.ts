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
import * as Validator from 'class-validator';


@Index("uq_insured_umcn", ["umcn"], { unique: true })
@Index("uq_insured_email", ["email"], { unique: true })
@Entity("client")
export class Client {
  @PrimaryGeneratedColumn({ type: "int", name: "client_id", unsigned: true })
  clientId: number;

  @Column({type:"varchar", unique: true, length: 13 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(13)
  umcn: string;

  @Column( { type:"varchar", length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,60)
  forename: string;

  @Column({ type:"varchar", length: 60 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(2,60)
  surname: string;

  @Column( { type:"varchar", nullable: true, length: 20 })
  @Validator.IsString()
  @Validator.IsPhoneNumber(null)
  @Validator.Length(0,20)
  phone: string | null;

  @Column( { type:"varchar", unique: true, length: 255 })
  @Validator.IsNotEmpty()
  @Validator.IsEmail({
    allow_ip_domain:false,//ne moze smao dshhdsa@127.0.0.1
    allow_utf8_local_part:true,
    require_tld:true,//ne moze samo kdaks@dsadsa
  })
  @Validator.Length(6,255)
  email: string;

  @Column( { type:"varchar",nullable: true, length: 255 })
  @Validator.IsString()
  @Validator.Matches(/^[a-zA-Z0-9\s,'-.]*$/)
  @Validator.Length(0,255)
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
