import localforage from 'localforage';
import deepFreeze from 'deep-freeze-es6';
import { Message } from '@/types/message';

const conversationsSeed = deepFreeze([
  {
    id: '0',
    name: 'Shamoun',
  },
  {
    id: '1',
    name: 'Your Friend Steve',
    participants: ['Steve', 'Garfunkel', 'Oates'],
  },
]);

const selfMessagesSeed = deepFreeze([
  {
    id: '0',
    senderName: 'You',
    date: new Date(),
    text: 'Saving this for later:',
  },
  {
    id: '1',
    senderName: 'You',
    date: new Date(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]);

const friendMessagesSeed = deepFreeze([
  {
    id: '0',
    senderName: 'You',
    date: new Date(),
    text: 'Hey Steve, check it out: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '1',
    senderName: 'Steve',
    date: new Date(),
    text: 'Woah dude that is deep... omg...',
  },
]);

export const seedApiData = () => {
  localforage.setItem('conversations', conversationsSeed);
  localforage.setItem('urn:conversation:0', selfMessagesSeed);
  localforage.setItem('urn:conversation:1', friendMessagesSeed);
  console.log('Initialised data');
};

export async function getConversations() {
  return localforage.getItem('conversations');
}

export async function getMessages(conversationId: string) {
  return localforage.getItem(`urn:conversation:${conversationId}`);
}

export async function createMessage({
  conversationId,
  text,
}: {
  conversationId: string;
  text: string;
}) {
  const id = Math.random().toString(36).substring(2, 9);
  const newMessage: Message = { id, senderName: 'You', date: new Date(), text };
  const currentMessages: Message[] = (await getMessages(
    conversationId,
  )) as Message[];
  currentMessages.push(newMessage);
  await localforage.setItem(
    `urn:conversation:${conversationId}`,
    currentMessages,
  );
  return newMessage;
}
