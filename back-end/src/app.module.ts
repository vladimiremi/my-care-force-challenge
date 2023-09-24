import { Module } from '@nestjs/common';

import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [ChatGateway, ChatService],
})
export class AppModule {}
