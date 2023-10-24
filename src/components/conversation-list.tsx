import { Conversation } from '@/types/conversation';
import { Link } from 'react-router-dom';

type ConversationListProps = {
  conversations: Conversation[];
};

const ConversationList = ({ conversations }: ConversationListProps) => {
  return (
    <ul role="list">
      {conversations.map((conversation) => (
        <li
          className="border-b-2 border-solid border-gray-200"
          key={conversation.id}
        >
          <Link
            className="inline-block min-h-full min-w-full p-3"
            to={`/conversations/${conversation.id}`}
          >
            <span className="text-lg">{conversation.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ConversationList;
