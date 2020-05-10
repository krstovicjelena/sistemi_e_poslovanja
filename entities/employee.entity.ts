import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Employee{
    @PrimaryGeneratedColumn({ name:'employee_id', type: 'int', unsigned:true })
    employeeId: number;

    @Column({type: 'varchar', length : '60', unique: true})
    username: string;

    @Column({name:'password_hash', type: 'varchar', length : '255'})
    passwordHash: string;

}