import { getThread } from '@/api/conversations';
import MessageComponent from '@/components/conversations/message';
import { Message } from '@/types/message';
import {
  Form,
  Link,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import { MESSAGE_FORM_INPUT_NAME } from '@/routes/conversations/detail';

export async function loader(messageId: string | undefined) {
  if (messageId) {
    const thread = await getThread(messageId);
    return thread;
  }
}

const ThreadDetail = () => {
  const conversationMessages = useRouteLoaderData('conversation') as Message[];
  const { messageId } = useParams();
  const initialMessage = conversationMessages.find(
    (message) => messageId === message.id,
  );
  const threadMessages = useLoaderData() as Message[];

  return (
    <aside className="flex w-1/3 flex-col border-l-2">
      <header className="box-content flex h-16 w-full shrink-0 items-center justify-between border-b-4 border-t-2">
        <h2 className="ml-3 text-xl font-bold">Thread View</h2>
        <Link className="mr-4" to="../">
          <span className="font-bold text-blue-700 hover:underline">Close</span>
        </Link>
      </header>
      <ul className="flex max-h-full flex-col overflow-y-auto">
        {initialMessage && (
          <MessageComponent
            message={initialMessage}
            key={initialMessage.id}
            isThreadView={true}
          />
        )}
        {threadMessages?.map((message: Message) => (
          <MessageComponent
            message={message}
            key={message.id}
            isThreadView={true}
          />
        ))}
      </ul>
      <section className="h-1/6 shrink-0 border-t">
        <Form method="post" className="flex h-full items-center">
          <input
            className="mx-5 flex-1 rounded-xl border p-2 shadow"
            placeholder="Enter your thread reply here"
            name={MESSAGE_FORM_INPUT_NAME}
            required
            spellCheck
          ></input>
        </Form>
      </section>
    </aside>
  );
};

export default ThreadDetail;
