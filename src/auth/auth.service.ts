import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/userDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userToLog: UserDto) {
    // todo: validar previamente el usuario
    const userValid = await this.usersService.validateUser(userToLog);
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

    return tokenData.id;
  }
}

// decoded token example: { username: 'chema1', id: 3, iat: 1675374750, exp: 1675547550 }
