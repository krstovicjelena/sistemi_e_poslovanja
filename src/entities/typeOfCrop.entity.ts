import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { CropInsurancePolicyTypeOfCrop } from "./cropInsurancePolicy-typeOfCrop.entity";
import * as Validator from 'class-validator';
import { CropInsurancePolicy } from "./cropInsurancePolicy.entity";
@Index("uq_type_of_crop_name", ["name"], { unique: true })
@Entity("type_of_crop")
export class TypeOfCrop {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "type_of_crop_id",
    unsigned: true,
  })
  typeOfCropId: number;

  @Column( {  type: "varchar", unique: true, length: 128 })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(1,128)
  name: string;

  @Column( {  type: "tinyint",name: "is_subsidized", unsigned: true })
  @Validator.IsNotEmpty()
  @Validator.IsIn([0,1])
  isSubsidized: number;

  @Column( {  type: "varchar",name: "subsidy_program", nullable: true, length: 255 })
  @Validator.IsString()
  @Validator.Length(0,255)
  subsidyProgram: string | null;

  @Column( { type: "varchar", name: "source_of_finance", nullable: true, length: 255 })
  @Validator.IsString()
  @Validator.Length(0,255)
  sourceOfFinance: string | null;

  @Column( { type: "double",name: "price_per_month_per_acre", precision: 22,scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  pricePerMonthPerAcre: number;

  @OneToMany(
    () => CropInsurancePolicyTypeOfCrop,
    (cropInsurancePolicyTypeOfCrop) => cropInsurancePolicyTypeOfCrop.typeOfCrop
  )
  cropInsurancePolicyTypeOfCrops: CropInsurancePolicyTypeOfCrop[];

  @ManyToMany(type =>CropInsurancePolicy,cropInsurancePolicy=>cropInsurancePolicy.crops)
  @JoinTable({
    name:"crop_insurance_policy_type_of_crop",
    joinColumn:{name:"type_of_crop_id", referencedColumnName: "typeOfCropId"},
    inverseJoinColumn:{name:"crop_insurance_policy_id", referencedColumnName: "cropInsurancePolicyId"}
    
  })
  policies: CropInsurancePolicy[];
}
