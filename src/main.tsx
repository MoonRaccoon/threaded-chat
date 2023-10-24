import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Detail from '@/routes/conversations/detail';
import Root, { loader as rootLoader } from '@/routes/root';
import { loader as conversationLoader } from '@/routes/conversations/detail';
import '@/index.css';
import { seedApiData } from '@/api/conversations';

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
        loader: ({ params }) => {
          return conversationLoader(params.conversationId);
        },
        element: <Detail />,
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
