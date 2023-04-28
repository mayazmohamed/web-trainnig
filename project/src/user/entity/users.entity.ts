import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Role } from "src/roles/rolse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;


    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role


}