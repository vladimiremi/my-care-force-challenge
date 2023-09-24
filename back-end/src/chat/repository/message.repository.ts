import { CreateMessageDTO } from '../dto/createMessage.dto';
import { Message } from '../interfaces/message.interface';

export abstract class MessageRepository {
  abstract saveMessage(data: CreateMessageDTO): Promise<Message>;
  abstract listMessages(): Promise<Message[]>;
}
