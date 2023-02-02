import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  @Get()
  findAll() {
    return this.UsersService.findAll();
  }
  @Get('/debug')
  debug() {
    return this.UsersService.debug();
  }
}
