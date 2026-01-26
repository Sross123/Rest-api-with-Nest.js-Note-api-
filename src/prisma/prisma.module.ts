import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
