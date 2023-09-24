import { MessageRepository } from 'src/chat/repository/message.repository';
import { PrismaService } from '../prisma.service';
import { CreateMessageDTO } from 'src/chat/dto/createMessage.dto';
import { Message } from 'src/chat/interfaces/message.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaMessageRepository implements MessageRepository {
  constructor(private prisma: PrismaService) {}
  async saveMessage(data: CreateMessageDTO): Promise<Message> {
    return await this.prisma.message.create({ data: data });
  }
  async listMessages(): Promise<Message[]> {
    return await this.prisma.message.findMany();
  }
}
