import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('addresses')
export class Address {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number
  
  @Column()
  districtId: number
  
  @Column()
  street: string
  
  @Column()
  addressNumber: number
  
  @Column()
  phone: string
  
  @Column()
  reference: string;
}
