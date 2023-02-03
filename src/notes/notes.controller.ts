import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDto } from './dto/noteDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiBearerAuth()
@ApiTags('notes')
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: NoteDto, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // get the token
    return this.notesService.create(createNoteDto, token);
  }

  @Get()
  findAll(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // get the token
    return this.notesService.findAll(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // get the token
    return this.notesService.findOne(id, token);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateNote: NoteDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.split(' ')[1]; // get the token
    return this.notesService.update(id, updateNote, token);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1]; // get the token
    return this.notesService.remove(id, token);
  }
}
