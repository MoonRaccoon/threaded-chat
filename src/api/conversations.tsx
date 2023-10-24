import localforage from 'localforage';
import deepFreeze from 'deep-freeze-es6';

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
