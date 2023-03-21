import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    MongooseModule.forRoot('mongodb://localhost/priv-notes'),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DBHOST || 'localhost',
        port: 5432,
        username: 'postgres',
        password: process.env.DBPASS || 'root',
        database: 'users',
        entities: [User],
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
