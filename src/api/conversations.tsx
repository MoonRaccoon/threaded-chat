const deepFreezeArray = (objectArray: Array<object> | undefined) => {
  if (objectArray) {
    objectArray.forEach((obj) => Object.freeze(obj));

    return Object.freeze(objectArray);
  }
};

const conversations = () => {
  const data = [
    {
      id: '0',
      name: 'Myself',
    },
    {
      id: '1',
      name: 'Your Friend Steve',
    },
  ];

  return deepFreezeArray(data);
};

const messages = (conversationId: string) => {
  let data: Array<object> | undefined;

  if (conversationId === '0') {
    data = [
      {
        id: '0',
        sender: 'my-user-id',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: '1',
        sender: 'steve-user-id',
        text: 'Woah dude that is deep... very cool...',
      },
    ];
  } else if (conversationId === '1') {
    data = [
      {
        id: '0',
        sender: 'steve-user-id',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: '1',
        sender: 'my-user-id',
        text: 'Woah dude you are a quick learner!',
      },
    ];
  }

  return deepFreezeArray(data);
};

export async function getConversations() {
  return conversations();
}