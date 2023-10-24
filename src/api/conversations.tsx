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
    id: '00',
    senderName: 'You',
    date: new Date(),
    text: 'Saving this for later:',
  },
  {
    id: '01',
    senderName: 'You',
    date: new Date(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]);

const friendMessagesSeed = deepFreeze([
  {
    id: '10',
    senderName: 'You',
    date: new Date(),
    text: 'Hey Steve, check it out: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '11',
    senderName: 'Steve',
    date: new Date(),
    text: 'Woah dude that is deep... omg...',
  },
]);

export const seedApiData = () => {
  localforage.setItem('conversations', conversationsSeed);
  localforage.setItem('urn:conversation:0', selfMessagesSeed);
  localforage.setItem('urn:conversation:1', friendMessagesSeed);
};

export async function getConversations() {
  return localforage.getItem('conversations');
}

// Retrieve messages for a conversation or a specific thread depending on urn type
export async function getMessages(urn: string) {
  return localforage.getItem(urn);
}

export async function getThread(messageId: string) {
  return localforage.getItem(`urn:message:${messageId}`);
}

export async function createMessage({
  urn,
  text,
}: {
  urn: string;
  text: string;
}) {
  const id = Math.random().toString(36).substring(2, 9);
  const newMessage: Message = {
    id,
    senderName: 'You',
    date: new Date(),
    text,
  };
  const currentMessages = ((await getMessages(urn)) as Message[]) ?? [];
  currentMessages.push(newMessage);

  await localforage.setItem(urn, currentMessages);
  return newMessage;
}
