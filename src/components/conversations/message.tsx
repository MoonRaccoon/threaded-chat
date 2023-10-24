import { Message } from '@/types/message';

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
  return (
    <li className="p-3 hover:bg-blue-100" key={key}>
      <article>
        <h3 className="mb-2 font-bold">
          {message.senderName} {formatDate(message.date)}
        </h3>
        <p className="whitespace-pre-line">{message.text}</p>
      </article>
    </li>
  );
};

export default MessageComponent;
