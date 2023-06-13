import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/auth.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  /**
   * ユーザー情報を取得する
   *
   * @param email string
   * @returns User
   */
  async findByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
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
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException();
    }
    const createdUser = await this.usersRepository.save(createUserDto);
    return createdUser;
  }
}
