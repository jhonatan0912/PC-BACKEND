import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('districts')
export class District {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
