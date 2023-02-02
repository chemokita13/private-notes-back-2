import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string) {
    return this.users.find((user1) => user1.username === username);
  }

  async findAll() {
    return await this.usersRepository.find();
  }
  async debug() {
    const userToSave = await this.usersRepository.create({
      username: 'chema',
      password: '1306',
    });
    return this.usersRepository.save(userToSave);
  }
}
