import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("condition")
export class Condition {
  @PrimaryGeneratedColumn({ type: "int", name: "condition_id", unsigned: true })
  conditionId: number;

  @Column({
    type:"enum",
    name: "policy_tipe",
    enum: ["accident", "fire", "car", "crop", "travel"],
  })
  policyTipe: "accident" | "fire" | "car" | "crop" | "travel";

  @Column( { type:"text", name: "text" })
  text: string;

  @Column( {
    type:"timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
