import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  authorId: number;
}
