import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(ChatGateway.name);
  constructor(private prisma: PrismaService) {}

  async handleConnection(client: Socket) {
    this.logger.log('Connected', client.id);

    const allMessages = await this.prisma.message.findMany();
    client.emit('previousMessages', allMessages);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnect', client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any) {
    this.logger.log('Send message');
    client.broadcast.emit('receivedMessage', payload);
    await this.prisma.message.create({ data: payload });
  }
}
