import { Outlet, useLoaderData } from 'react-router-dom';
import { getConversations } from '@/api/conversations';
import { Conversation } from '@/types/conversation';
import ConversationListComponent from '@/components/conversation-list';

export async function loader() {
  const conversations = await getConversations();
  return conversations;
}

const Root = () => {
  const conversations = useLoaderData() as Conversation[];

  return (
    <div className="flex h-screen">
      <nav className="flex w-1/4 min-w-min flex-none flex-col border-2 border-gray-200	">
        <h1 className="box-content flex h-16 shrink-0 items-center border-b-4 border-gray-200 px-3 text-3xl">
          Messages
        </h1>
        <ConversationListComponent conversations={conversations} />
      </nav>
      <Outlet />
    </div>
  );
};

export default Root;
