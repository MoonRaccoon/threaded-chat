import { useState } from 'react';

const Root = () => {
  const [count, setCount] = useState(0);

  return (
    <main className="flex h-screen">
      <section className="flex w-1/4 flex-col"></section>
      <section className="flex-1"></section>
      <section className="w-1/4"></section>
    </main>
  );
};

export default Root;
