import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as Validator from 'class-validator';
@Entity("condition")
export class Condition {
  @PrimaryGeneratedColumn({ type: "int", name: "condition_id", unsigned: true })
  conditionId: number;

  @Column({
    type:"enum",
    name: "policy_tipe",
    enum: ["accident", "fire", "car", "crop", "travel"],
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.IsIn(["accident", "fire", "car", "crop", "travel"])
  policyTipe: "accident" | "fire" | "car" | "crop" | "travel";

  @Column( { type:"text", name: "text" })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  @Validator.Length(20,10000)
  text: string;

  @Column( {
    type:"timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
