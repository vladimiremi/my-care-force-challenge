import { ChatService } from './chat.service';
import { MessageInMemoryRepository } from './repository/inMemory/messageInMemory.repository';

let messageRepository: MessageInMemoryRepository;
let sut: ChatService;

describe('Chat', () => {
  beforeEach(async () => {
    messageRepository = new MessageInMemoryRepository();
    sut = new ChatService(messageRepository);
  });

  it('Should be able create a message', async () => {
    const newMessage = await sut.saveMessage({
      id: 'un24839',
      author: 'Author Teste',
      message: 'Olá',
    });

    expect(newMessage.message).toEqual(expect.any(String));
  });

  it('Should be able list all messages', async () => {
    await sut.saveMessage({
      id: 'un24839',
      author: 'Author Teste',
      message: 'Olá',
    });

    await sut.saveMessage({
      id: 'un24839',
      author: 'Author Teste',
      message: 'Olá',
    });

    const allMessages = await sut.listMessage();

    expect(allMessages.length).toEqual(2);
  });
});
