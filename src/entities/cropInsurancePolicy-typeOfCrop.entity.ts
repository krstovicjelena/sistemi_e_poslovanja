import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CropInsurancePolicy } from "./cropInsurancePolicy.entity";
import { TypeOfCrop } from "./typeOfCrop.entity";
import * as Validator from 'class-validator';
@Index(
  "fk_crop_insurance_policy_type_of_crop_crop_insurance_policy_id",
  ["cropInsurancePolicyId"],
  {}
)
@Index(
  "fk_crop_insurance_policy_type_of_crop_type_of_crop_id",
  ["typeOfCropId"],
  {}
)
@Entity("crop_insurance_policy_type_of_crop")
export class CropInsurancePolicyTypeOfCrop {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "crop_insurance_policy_type_of_crop_id",
    unsigned: true,
  })
  cropInsurancePolicyTypeOfCropId: number;

  @Column( { type: "int",name: "crop_insurance_policy_id", unsigned: true })
  cropInsurancePolicyId: number;

  @Column({ type: "int",name: "type_of_crop_id", unsigned: true })
  typeOfCropId: number;

  @Column( { type: "double",name: "area_under_culture", precision: 22,scale:2 })
  @Validator.IsNotEmpty()
  @Validator.IsPositive()
  @Validator.IsNumber({
    allowInfinity:false,
    allowNaN: false,
    maxDecimalPlaces: 2
  })
  areaUnderCulture: number;

  @ManyToOne(
    () => CropInsurancePolicy,
    (cropInsurancePolicy) => cropInsurancePolicy.cropInsurancePolicyTypeOfCrops,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    {
      name: "crop_insurance_policy_id",
      referencedColumnName: "cropInsurancePolicyId",
    },
  ])
  cropInsurancePolicy: CropInsurancePolicy;

  @ManyToOne(
    () => TypeOfCrop,
    (typeOfCrop) => typeOfCrop.cropInsurancePolicyTypeOfCrops,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "type_of_crop_id", referencedColumnName: "typeOfCropId" },
  ])
  typeOfCrop: TypeOfCrop;
}
