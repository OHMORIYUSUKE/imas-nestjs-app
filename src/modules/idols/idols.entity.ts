import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Idols {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;
}
