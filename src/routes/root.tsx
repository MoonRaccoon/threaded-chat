import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen">
      <nav className="flex w-1/4 flex-none flex-col">
        <h1>Messages</h1>
        <ul>
          <li>
            <a href={`/conversations/1`}>Your Name</a>
          </li>
          <li>
            <a href={`/conversations/2`}>Your Friend</a>
          </li>
        </ul>
      </nav>
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
