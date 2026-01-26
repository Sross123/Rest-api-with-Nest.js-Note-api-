import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Request() req: { user: { sub: number | string } }) {
    return this.notesService.create(createNoteDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: { user: { sub: string } }) {
    return this.notesService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: { user: { sub: string } }) {

    return this.notesService.findOne(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Request() req: { user: { sub: string } }) {
    return this.notesService.update(id, req.user.sub, updateNoteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: { sub: string } }) {
    return this.notesService.remove(id, req.user.sub);
  }
}
