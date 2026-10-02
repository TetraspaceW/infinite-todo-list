import useSWR from "swr";

import { fetchMe } from "../lib/api";
import { useEffect, useState } from "react";
import type { Entry, User } from "../lib/backend/types";

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
      const { user } = await fetchMe().catch(() => ({ user: null }));

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
        {data?.projects?.map((todo: Entry) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      <p>
        {user ? (
          `Logged in as ${user.name}`
        ) : (
          <a href="/auth">Log in</a>
        )}
      </p>
    </main>
  );

  return isLoading ? <p>Loading...</p> : <InfiniteTodoList />;
};

export default Home;
