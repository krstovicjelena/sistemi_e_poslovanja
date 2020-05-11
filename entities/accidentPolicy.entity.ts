import {
  Column,
  Entity,
  Index, 
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";

@Index("fk_accidend_policy_client_id", ["clientId"], {})
@Entity("accident_policy")
export class AccidentPolicy {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "accident_policy_id",
    unsigned: true,
  })
  accidentPolicyId: number;

  @Column({ type: "int",name: "client_id", unsigned: true })
  clientId: number;

  @Column({  type: "date", name: "starts_at" })
  startsAt: string;

  @Column({ type: "date",name: "expires_at" })
  expiresAt: string;

  @Column({ type: "double", precision: 22 })
  price: number;

  @Column({  type: "text", nullable: true })
  condition: string | null;

  @ManyToOne(() => Client, (client) => client.accidentPolicies, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Client;
}
