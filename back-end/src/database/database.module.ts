import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MessageRepository } from 'src/chat/repository/message.repository';
import { PrismaMessageRepository } from './prisma/repositories/prismaMessage.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MessageRepository,
      useClass: PrismaMessageRepository,
    },
  ],
  exports: [PrismaService, MessageRepository],
})
export class DatabaseModule {}
