import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
