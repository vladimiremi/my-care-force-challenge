import { Injectable } from '@nestjs/common';
import { MessageRepository } from './repository/message.repository';
import { CreateMessageDTO } from './dto/createMessage.dto';

@Injectable()
export class ChatService {
  constructor(private messageRepository: MessageRepository) {}

  async saveMessage(data: CreateMessageDTO) {
    return await this.messageRepository.saveMessage(data);
  }

  async listMessage() {
    return await this.messageRepository.listMessages();
  }
}
