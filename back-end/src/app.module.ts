import { Module } from '@nestjs/common';

import { ChatGateway } from './chat/chat.gateway';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, PrismaService],
})
export class AppModule {}
