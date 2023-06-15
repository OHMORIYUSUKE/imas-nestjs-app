import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @PrimaryColumn({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'text' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}

export type UsersWithoutPassword = Omit<Users, 'password'>;
