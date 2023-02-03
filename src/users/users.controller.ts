import { Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express'; // dto
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  newUser(@Req() req: Request) {
    return this.usersService.newUser(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // get the token
    return this.usersService.deleteUser(token);
  }
}
