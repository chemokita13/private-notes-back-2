import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDoc = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop()
  _id: string;
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  authorId: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
