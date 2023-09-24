import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { ChatService } from './chat.service';

@WebSocketGateway(8001, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(ChatGateway.name);
  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket) {
    this.logger.log('Connected', client.id);

    const allMessages = await this.chatService.listMessage();
    client.emit('previousMessages', allMessages);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Disconnect', client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: CreateMessageDTO) {
    this.logger.log('Send message');
    client.broadcast.emit('receivedMessage', payload);
    await this.chatService.saveMessage(payload);
  }
}
