import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './note.schema';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
})
export class NotesModule {}
