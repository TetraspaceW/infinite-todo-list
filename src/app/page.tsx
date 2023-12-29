"use client";

import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/todos", fetcher);

  return (
    <main>
      <h1>Infinite To-Do List</h1>
      <ul>
        {data?.projects?.map((todo: any) => (
          <li key={todo.name}>{todo.name}</li>
        ))}
      </ul>
    </main>
  );
}
