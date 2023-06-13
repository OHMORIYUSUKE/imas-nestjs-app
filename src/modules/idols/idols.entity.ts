import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Users } from '../users/users.entity';

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

@Entity()
@Index(['userId', 'idolId'], { unique: true })
export class FavoriteIdols {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'idol_id', type: 'int' })
  idolId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}
