import { createMessage } from '@/api/conversations';
import { MESSAGE_FORM_INPUT_NAME } from '@/routes/conversations/detail';
import { Params } from 'react-router-dom';

export default async function createMessageAction({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  const formData = await request.formData();
  const { messageId, conversationId } = params;
  const text = formData.get(MESSAGE_FORM_INPUT_NAME)?.toString();
  let urn;

  if (messageId) {
    urn = `urn:message:${messageId}`;
  } else if (conversationId) {
    urn = `urn:conversation:${conversationId}`;
  }

  if (urn && text) {
    const message = await createMessage({
      urn,
      text,
    });

    return { message };
  }
}
