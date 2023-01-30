import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}
  create(createNoteDto: CreateNoteDto) {
    return this.noteModel.create(createNoteDto);
  }

  async findAll(): Promise<Note[]> {
    return await this.noteModel.find({});
  }

  async findOne(id: string): Promise<Note> {
    //todo: .
    //* return await this.noteModel.findById(id) WHY THAT IS NOT WORKING!?
    return await this.noteModel.findOne({ id: id }); //? AND THAT YES?
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return await this.noteModel.findByIdAndUpdate(id, updateNoteDto);
  }

  async remove(id: string) {
    return await this.noteModel.findByIdAndDelete(id);
  }
}
