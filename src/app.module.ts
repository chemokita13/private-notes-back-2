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
    ConfigModule.forRoot({}),
    AuthModule,
    UsersModule,
    NotesModule,
    MongooseModule.forRoot(process.env.MONGODBURI||'mongodb://localhost/priv-notes'),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.PGHOST || 'localhost',
        port:  parseInt(process.env.PGPORT, 10) || 5432,
        username: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'root',
        database: process.env.PGDATABASE||'users',
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
