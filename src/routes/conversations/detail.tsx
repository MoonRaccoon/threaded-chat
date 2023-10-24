import { getMessages } from '@/api/conversations';
import { Conversation } from '@/types/conversation';
import { Message } from '@/types/message';
import { useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';

export async function loader(conversationId: string | undefined) {
  if (conversationId) {
    console.log(conversationId);
    const messages = await getMessages(conversationId);
    return messages;
  }
}

function formatDate(date: Date) {
  return `(${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})`;
}

const Detail = () => {
  const conversations = useRouteLoaderData('root') as Conversation[];
  const messages = useLoaderData() as Message[];
  const { conversationId } = useParams();
  const { participants } = conversations.find(
    (conversation) => conversationId === conversation.id,
  ) ?? { participants: undefined };

  return (
    <main className="flex flex-1">
      <section className="w-3/4 border-2 border-solid border-gray-200">
        <header className="w-100 box-content flex h-16 items-center border-b-4 border-gray-200 pl-3">
          <h2 className="mr-1 text-lg">To: </h2>
          <ul className="flex">
            {participants ? (
              participants.map((participant: string, index: number) => (
                <li className="ml-1" key={participant}>
                  <span className="font-bold">
                    {participant}
                    {index !== participants.length - 1 && <span>,</span>}
                  </span>
                </li>
              ))
            ) : (
              <span className="ml-1 font-bold">Me</span>
            )}
          </ul>
        </header>
        <ul className="flex flex-col">
          {messages.map((message: Message) => (
            <li className="my-1 ml-3" key={message.id}>
              <span className="font-bold">
                {message.senderName} {formatDate(message.date)}
              </span>
              <p>{message.text}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>Test 2!</section>
    </main>
  );
};

export default Detail;
