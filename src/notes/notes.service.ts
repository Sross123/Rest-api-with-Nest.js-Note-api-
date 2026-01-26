import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) { }


  async create(createNoteDto: CreateNoteDto, UserId: number | string) {
    const note = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        UserId: String(UserId)
      }
    });
    return {
      message: 'Note created successfully',
      note
    };
  }

  async findAll(UserId: string) {
    const notes = await this.prisma.note.findMany({ where: { UserId: String(UserId) } });
    return {
      message: 'All notes retrieved successfully',
      data: notes,
      count: notes.length
    };
  }

  async findOne(id: string, UserId: string) {
    const note = await this.prisma.note.findUnique({ where: { id: String(id) } });

    if (!note) {
      throw new NotFoundException("Not Found!")
    }

    if (note?.UserId !== UserId) {
      throw new ForbiddenException("Not allowed!")
    }
    return {
      message: `Note retrieved successfully`,
      data: note
    };
  }

  async update(id: string, UserId: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.prisma.note.findUnique({ where: { id: String(id) } });

    if (!note) {
      throw new NotFoundException("Not Found!")
    }

    if (note?.UserId !== UserId) {
      throw new ForbiddenException("Not allowed!")
    }

    const updatedNote = await this.prisma.note.update({
      where: { id: String(id) },
      data: updateNoteDto
    });

    return {
      message: `Note updated successfully`,
      data: updatedNote
    };
  }

  async remove(id: string, UserId: string) {
    const note = await this.prisma.note.findUnique({ where: { id: String(id) } });

    if (!note) {
      throw new NotFoundException("Not Found!")
    }

    if (note?.UserId !== UserId) {
      throw new ForbiddenException("Not allowed!")
    }

    await this.prisma.note.delete({ where: { id: String(id) } })

    return {
      message: `Note deleted successfully`,
      data: note
    };
  }
}
