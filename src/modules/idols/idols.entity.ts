import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Idole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;
}
