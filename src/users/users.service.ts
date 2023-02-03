import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDto } from './dto/userDto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

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
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async newUser(userToSave: UserDto) {
    try {
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
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async validateUser(
    userToCheck: UserDto,
  ): Promise<{ valid: boolean; user?: UserDto }> {
    try {
      const user = await this.usersRepository.findOne({
        where: { username: userToCheck.username },
      });
      if (!user) return { valid: false };
      const matchPass = await bcrypt.compare(
        userToCheck.password,
        user.password,
      );
      if (!matchPass) return { valid: false };
      return { valid: true, user };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async deleteUser(token: string) {
    try {
      const userId = await this.authService.getIdFromToken(token);
      const userToDelete = await this.usersRepository.delete(userId);
      return userToDelete;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
