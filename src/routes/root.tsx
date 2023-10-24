import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { getConversations } from '@/api/conversations';
import { Conversation } from '@/types/conversation';

export async function loader() {
  const conversations = await getConversations();
  return conversations;
}

const Root = () => {
  const conversations = useLoaderData() as Conversation[];

  return (
    <div className="flex h-screen">
      <nav className="flex w-1/4 flex-none flex-col">
        <h1>Messages</h1>
        <ul>
          {conversations.map((conversation: Conversation) => (
            <li key={conversation.id}>
              <Link to={`/conversations/${conversation.id}`}>
                {conversation.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
