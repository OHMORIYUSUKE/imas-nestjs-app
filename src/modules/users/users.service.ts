import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/auth.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

type User = {
  userId: number;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  /**
   * ユーザー情報を取得する
   *
   * @param email string
   * @returns User
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  /**
   * ユーザーを作る
   *
   * @param createUserDto
   * @returns
   */
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto & Users> {
    const createdUser = await this.usersRepository.save(createUserDto);
    return createdUser;
  }
}
