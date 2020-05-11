import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CropInsurancePolicyTypeOfCrop } from "./cropInsurancePolicy-typeOfCrop.entity";

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
  name: string;

  @Column( {  type: "tinyint",name: "is_subsidized", unsigned: true })
  isSubsidized: number;

  @Column( {  type: "varchar",name: "subsidy_program", nullable: true, length: 255 })
  subsidyProgram: string | null;

  @Column( { type: "varchar", name: "source_of_finance", nullable: true, length: 255 })
  sourceOfFinance: string | null;

  @Column( { type: "double",name: "price_per_month_per_acre", precision: 22 })
  pricePerMonthPerAcre: number;

  @OneToMany(
    () => CropInsurancePolicyTypeOfCrop,
    (cropInsurancePolicyTypeOfCrop) => cropInsurancePolicyTypeOfCrop.typeOfCrop
  )
  cropInsurancePolicyTypeOfCrops: CropInsurancePolicyTypeOfCrop[];
}
