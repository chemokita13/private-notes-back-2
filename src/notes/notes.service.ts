import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<Note>) {}

  async create(createNote: CreateNoteDto): Promise<Note> {
    try {
      const newNote = await new this.noteModel(createNote).save();
      return newNote;
    } catch (e) {
      throw new HttpException(
        { message: 'Note could not be created', error: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Note[]> {
    try {
      const notes = await this.noteModel.find({});
      return notes;
    } catch (err) {
      throw new HttpException(
        { message: 'Something went wrong', error: err },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Note> {
    try {
      //return await this.noteModel.findById<Note>(id); // WHY THAT IS NOT WORKING!?
      return await this.noteModel.findOne({ id: id }); //? AND THAT YES?
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong', error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateNote: UpdateNoteDto): Promise<Note> {
    try {
      return await this.noteModel.findOneAndUpdate({ id: id }, updateNote, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong', error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Note> {
    try {
      return await this.noteModel.findOneAndDelete({ id: id });
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong', error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
