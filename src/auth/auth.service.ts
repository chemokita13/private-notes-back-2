import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/userDto';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
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

  async login(userToLog: UserDto) {
    const userValid = await this.validateUser(userToLog);
    if (!userValid || !userValid.valid)
      throw new HttpException('USER_NOT_FOUND_OR_NOT_VALID', 404);
    const { user } = userValid;
    const payload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
  async getIdFromToken(token: string) {
    const tokenData = this.jwtService.decode(token);
    if (!tokenData || typeof tokenData == 'string') return null;
    const user = await this.usersRepository.findOne({
      where: { id: tokenData.id },
    });
    if (tokenData.username === user.username) return tokenData.id;
    return null; // if nothing happens
  }
}

// decoded token example: { username: 'chema1', id: 3, iat: 1675374750, exp: 1675547550 }
