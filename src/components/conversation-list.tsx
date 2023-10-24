import { Conversation } from '@/types/conversation';
import { NavLink } from 'react-router-dom';

type ConversationListProps = {
  conversations: Conversation[];
};

const ConversationListComponent = ({
  conversations,
}: ConversationListProps) => {
  return (
    <ul className="max-h-full overflow-y-auto" role="list">
      {conversations.map((conversation) => (
        <li className="border-b" key={conversation.id}>
          <NavLink
            to={`conversations/${conversation.id}`}
            className={({ isActive, isPending }) =>
              'inline-block min-h-full min-w-full p-3 '.concat(
                isActive
                  ? 'bg-blue-700 text-white'
                  : isPending
                  ? 'text-blue-700'
                  : 'hover:bg-blue-100',
              )
            }
          >
            <span className="overflow-ellipsis text-lg">
              {conversation.name}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ConversationListComponent;
