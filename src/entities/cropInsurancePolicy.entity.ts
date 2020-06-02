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
import { CropInsurancePolicyTypeOfCrop } from "./cropInsurancePolicy-typeOfCrop.entity";
import * as Validator from 'class-validator';
@Index("fk_crop_insurance_policy_client_id", ["clientId"], {})
@Entity("crop_insurance_policy")
export class CropInsurancePolicy {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "crop_insurance_policy_id",
    unsigned: true,
  })
  cropInsurancePolicyId: number;

  @Column({  type: "int",name: "client_id", unsigned: true })
  clientId: number;

  @Column( { type: "date", name: "starts_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  startsAt: string;

  @Column( {type: "date", name: "expires_at" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(10)
  expiresAt: string;

  @Column( { type: "double", precision: 22, scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  price: number;

  @Column( { type: "text",nullable: true })
  @Validator.IsString()
  @Validator.Length(0,512)
  condition: string | null;

  @ManyToOne(() => Client, (client) => client.cropInsurancePolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;

  @OneToMany(
    () => CropInsurancePolicyTypeOfCrop,
    (cropInsurancePolicyTypeOfCrop) =>
      cropInsurancePolicyTypeOfCrop.cropInsurancePolicy
  )
  cropInsurancePolicyTypeOfCrops: CropInsurancePolicyTypeOfCrop[];
}
