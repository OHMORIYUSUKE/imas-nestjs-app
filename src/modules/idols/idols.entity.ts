import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Idols {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'name', type: 'varchar' })
  readonly name: string;

  @Column({ name: 'image', type: 'text' })
  readonly image: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
