"use client";

import Link from "next/link";
import useSWR from "swr";

import { supabase } from "./supabase";

type Todo = {
  name: string;
};

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/todos", fetcher);

  return (
    <main>
      <h1>Infinite To-Do List</h1>
      <ul>
        {data?.projects?.map((todo: Todo) => (
          <li key={todo.name}>{todo.name}</li>
        ))}
      </ul>
      <p>
        <Link href="/auth">Log in</Link>
      </p>
    </main>
  );
};

export default Home;
