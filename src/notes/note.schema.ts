import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDoc = HydratedDocument<Note>;

@Schema({ versionKey: false })
export class Note {
  // @Prop()
  // _id?: string;
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  authorId: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
