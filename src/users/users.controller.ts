import { Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express'; // dto

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('/debug')
  debug() {
    return this.usersService.validateUser({
      username: 'chema1',
      password: '13',
    });
  }
  @Post()
  newUser(@Req() req: Request) {
    return this.usersService.newUser(req.body);
  }
}
