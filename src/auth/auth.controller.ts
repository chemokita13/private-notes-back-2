import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/userDto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiBody({
    description: 'User object',
    type: UserDto,
  })
  async login(@Req() req: Request) {
    return this.authService.login(req.body);
  }
}
