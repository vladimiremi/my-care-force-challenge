import { CreateMessageDTO } from 'src/chat/dto/createMessage.dto';
import { Message } from 'src/chat/interfaces/message.interface';
import { MessageRepository } from '../message.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageInMemoryRepository implements MessageRepository {
  private messages: Message[] = [];
  async saveMessage(data: CreateMessageDTO): Promise<Message> {
    const newMessage = data;
    this.messages.push(newMessage);

    return newMessage;
  }

  async listMessages(): Promise<Message[]> {
    return this.messages;
  }
}
