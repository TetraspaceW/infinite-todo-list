"use client";

import Link from "next/link";
import useSWR from "swr";

import { supabase } from "./supabase";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

type Todo = {
  name: string;
};

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const {
    data,
    error,
    isLoading: todosLoading,
  } = useSWR("/api/todos", fetcher);

  const [user, setUser] = useState<User | null>();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const getAndSetUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setUserLoading(false);
    };

    getAndSetUser();
  }, []);

  const isLoading = todosLoading || userLoading;

  const InfiniteTodoList = () => (
    <main>
      <h1>Infinite To-Do List</h1>
      <ul>
        {data?.projects?.map((todo: Todo) => (
          <li key={todo.name}>{todo.name}</li>
        ))}
      </ul>
      <p>
        {user ? (
          `Logged in as ${user.user_metadata.full_name}`
        ) : (
          <Link href="/auth">Log in</Link>
        )}
      </p>
    </main>
  );

  return isLoading ? <p>Loading...</p> : <InfiniteTodoList />;
};

export default Home;
