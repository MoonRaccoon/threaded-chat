import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ConversationDetail from '@/routes/conversations/detail';
import ThreadDetail from '@/routes/conversations/threads/detail';
import Root, { loader as rootLoader } from '@/routes/root';
import { loader as conversationLoader } from '@/routes/conversations/detail';
import { loader as threadLoader } from '@/routes/conversations/threads/detail';
import '@/index.css';
import { seedApiData } from '@/api/conversations';
import createMessageAction from './actions/create-message';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    id: 'root',
    children: [
      {
        path: 'conversations/:conversationId',
        element: <ConversationDetail />,
        loader: ({ params }) => {
          return conversationLoader(params.conversationId);
        },
        action: createMessageAction,
        id: 'conversation',
        children: [
          {
            path: '/conversations/:conversationId/thread/:messageId',
            element: <ThreadDetail />,
            loader: ({ params }) => {
              return threadLoader(params.messageId);
            },
            action: createMessageAction,
          },
        ],
      },
    ],
  },
]);

seedApiData();
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
