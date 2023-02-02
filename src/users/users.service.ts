import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDto } from './dto/userDto';
import * as bcrypt from 'bcrypt';

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

  private readonly BcryptSalt = process.env.BCRYPTSALT || 5;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
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

  async newUser(userToSave: UserDto) {
    // bcrypt password
    const hashedPassword = await bcrypt.hash(
      userToSave.password,
      this.BcryptSalt,
    );
    // create the user that will be stored (with hashed password)
    const newUser = await this.usersRepository.create({
      username: userToSave.username,
      password: hashedPassword,
    });
    // save the user and return
    return this.usersRepository.save(newUser);
  }

  async validateUser(
    userToCheck: UserDto,
  ): Promise<{ valid: boolean; user?: UserDto }> {
    const user = await this.usersRepository.findOne({
      where: { username: userToCheck.username },
    });
    if (!user) return { valid: false };
    const matchPass = await bcrypt.compare(userToCheck.password, user.password);
    if (!matchPass) return { valid: false };
    return { valid: true, user };
  }
  async getUserFromToken(token: string) {
    const user = await this.usersRepository.findOne({
      where: { username: token },
    });
    if (!user) return { valid: false };
    return { valid: true, user };
  }
}
