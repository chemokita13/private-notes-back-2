import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './note.schema';
import { NoteDto } from './dto/noteDto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel('Note')
    private readonly noteModel: Model<Note>,
    private readonly authService: AuthService,
  ) {}

  async create(createNote: NoteDto, token: string): Promise<Note> {
    try {
      const authorID = await this.authService.getIdFromToken(token);
      const newNote = await new this.noteModel({
        ...createNote,
        authorId: authorID,
      }).save();
      return newNote;
    } catch (e) {
      throw new HttpException(
        { message: 'Note could not be created', error: e },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(token: string): Promise<Note[]> {
    try {
      const authorID = await this.authService.getIdFromToken(token);
      const notes = await this.noteModel.find({ authorId: authorID });
      return notes;
    } catch (err) {
      throw new HttpException(
        { message: 'Something went wrong', error: err },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, token: string): Promise<Note> {
    try {
      const authorID = await this.authService.getIdFromToken(token);
      //return await this.noteModel.findById<Note>(id); // WHY THAT IS NOT WORKING!?
      return await this.noteModel.findOne({ id: id, authorId: authorID }); //? AND THAT YES?
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong', error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateNote: NoteDto, token: string): Promise<Note> {
    try {
      const authorID = await this.authService.getIdFromToken(token);
      const noteToUpdate = {
        title: updateNote.title,
        content: updateNote.content,
      }; // to ONLY save title and content and no things like _id or authorID
      return await this.noteModel.findOneAndUpdate(
        { id: id, authorId: authorID },
        noteToUpdate,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong', error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string, token: string): Promise<Note> {
    try {
      const authorID = await this.authService.getIdFromToken(token);
      return await this.noteModel.findOneAndDelete({
        id: id,
        authorId: authorID,
      });
    } catch (error) {
      throw new HttpException(
        { message: 'Something went wrong', error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
