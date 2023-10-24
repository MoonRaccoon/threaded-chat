import { getMessages } from '@/api/conversations';
import { Conversation } from '@/types/conversation';
import { Message } from '@/types/message';
import MessageComponent from '@/components/conversations/message';
import {
  useLoaderData,
  useParams,
  useRouteLoaderData,
  Form,
  Outlet,
} from 'react-router-dom';
import ParticipantsComponent from '@/components/conversations/participants';

export async function loader(conversationId: string | undefined) {
  if (conversationId) {
    const messages = await getMessages(`urn:conversation:${conversationId}`);
    return messages;
  }
}

export const MESSAGE_FORM_INPUT_NAME = 'messageText';

const ConversationDetail = () => {
  const conversations = useRouteLoaderData('root') as Conversation[];
  const messages = useLoaderData() as Message[];

  const { conversationId } = useParams();
  const participants = conversations.find(
    (conversation) => conversationId === conversation.id,
  )?.participants;

  return (
    <main className="flex flex-1">
      <article className="flex flex-1 flex-col border-2">
        <header className="box-content flex h-16 w-full shrink-0 items-center border-b-4">
          <h2 className="ml-3 mr-2 text-lg">To:</h2>
          <ParticipantsComponent participants={participants} />
        </header>
        <ul className="flex max-h-full flex-1 flex-col overflow-y-auto">
          {messages.map((message: Message) => (
            <MessageComponent message={message} key={message.id} />
          ))}
        </ul>
        <section className="h-1/4 border-t-4">
          <Form method="post" className="flex h-full items-center">
            <textarea
              className="ml-5 h-3/4 flex-1 rounded-xl border p-2 shadow"
              placeholder="Enter your message here"
              name={MESSAGE_FORM_INPUT_NAME}
              required
              spellCheck
            ></textarea>
            <section className="flex h-full w-1/4 items-center justify-center">
              <button
                className="rounded-md bg-blue-700 px-4 py-2 text-lg text-white shadow shadow-blue-700/50"
                type="submit"
              >
                Send
              </button>
            </section>
          </Form>
        </section>
      </article>
      <Outlet />
    </main>
  );
};

export default ConversationDetail;
