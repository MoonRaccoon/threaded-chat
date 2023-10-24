import { Message } from '@/types/message';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type MessageProps = {
  message: Message;
  isThreadView?: boolean;
};

function formatDate(date: Date) {
  return `
    (${date.getMonth()}/${date.getDate()}/${date.getFullYear()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()})
  `;
}

const MessageComponent = ({ message, isThreadView = false }: MessageProps) => {
  const [shouldShowReplyControl, setShouldShowReplyControl] = useState(false);
  const showReplyControl = () => setShouldShowReplyControl(true);
  const hideReplyControl = () => setShouldShowReplyControl(false);

  return (
    <li
      className={'p-3 '.concat(!isThreadView ? 'hover:bg-blue-100' : '')}
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
          {!isThreadView && (
            <Link
              className={'ml-3 text-blue-700	'.concat(
                shouldShowReplyControl ? 'visible' : 'invisible',
              )}
              to={`./thread/${message.id}`}
            >
              <span className="hover:underline">Reply</span>
            </Link>
          )}
        </header>
        <p className="whitespace-pre-line">{message.text}</p>
      </article>
    </li>
  );
};

export default MessageComponent;
