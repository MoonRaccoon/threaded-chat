import { getMessages, createMessage } from '@/api/conversations';
import { Conversation } from '@/types/conversation';
import { Message } from '@/types/message';
import MessageComponent from '@/components/conversations/message';
import {
  useLoaderData,
  useParams,
  useRouteLoaderData,
  Form,
  Params,
} from 'react-router-dom';
import ParticipantsComponent from '@/components/conversations/participants';

export async function loader(conversationId: string | undefined) {
  if (conversationId) {
    const messages = await getMessages(conversationId);
    return messages;
  }
}

const MESSAGE_FORM_TEXTAREA_NAME = 'messageText';

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const FormData = await request.formData();
  const { conversationId } = params;
  const text = FormData.get(MESSAGE_FORM_TEXTAREA_NAME)?.toString();

  if (conversationId && text) {
    const message = await createMessage({
      conversationId,
      text,
    });

    return { message };
  }
}

const Detail = () => {
  const conversations = useRouteLoaderData('root') as Conversation[];
  const messages = useLoaderData() as Message[];
  const { conversationId } = useParams();
  const { participants } = conversations.find(
    (conversation) => conversationId === conversation.id,
  ) ?? { participants: undefined };

  const hasThread = false;

  return (
    <main className="flex flex-1">
      <article className="flex w-full flex-col border-2">
        <header className="box-content flex h-16 w-full shrink-0 items-center border-b-4">
          <h2 className="ml-3 mr-2 text-lg">To: </h2>
          <ParticipantsComponent participants={participants} />
        </header>
        <ul className="flex flex-1 flex-col ">
          {messages.map((message: Message) => (
            <MessageComponent message={message} key={message.id} />
          ))}
        </ul>
        <section className="h-1/4 border-t-4">
          <Form method="post" className="flex h-full items-center">
            <textarea
              className="ml-5 h-3/4 flex-1 rounded-xl border p-2 shadow"
              placeholder="Enter your message here"
              name={MESSAGE_FORM_TEXTAREA_NAME}
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
      {hasThread && <section>Test 2!</section>}
    </main>
  );
};

export default Detail;
