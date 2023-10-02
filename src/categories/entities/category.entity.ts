import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  icon: string;

  @Column()
  name: string;
}
