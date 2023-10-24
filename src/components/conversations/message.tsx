import { Message } from '@/types/message';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

type MessageProps = {
  message: Message;
  key: string;
};

function formatDate(date: Date) {
  return `
    (${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})
  `;
}

const MessageComponent = ({ message, key }: MessageProps) => {
  const [shouldShowReplyControl, setShouldShowReplyControl] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const showReplyControl = () => setShouldShowReplyControl(true);
  const hideReplyControl = () => setShouldShowReplyControl(false);

  return (
    <li
      className="p-3 hover:bg-blue-100"
      key={key}
      onMouseOver={showReplyControl}
      onMouseOut={hideReplyControl}
      onFocus={showReplyControl}
      onBlur={hideReplyControl}
    >
      <article>
        <header className="mb-2 flex font-bold">
          <h3>
            {message.senderName} {formatDate(message.date)}
          </h3>
          <Link
            className={'ml-3 text-blue-700	'.concat(
              shouldShowReplyControl ? 'visible' : 'invisible',
            )}
            to={`?thread=${message.id}`}
          >
            <span className="hover:underline">Reply</span>
          </Link>
        </header>
        <p className="whitespace-pre-line">{message.text}</p>
      </article>
    </li>
  );
};

export default MessageComponent;
