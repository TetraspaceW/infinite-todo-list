import useSWR from "swr";

import { createEntry, destroyEntry, fetchMe } from "../lib/api";
import { useEffect, useState, type SubmitEvent } from "react";
import type { Entry, Me } from "../lib/backend/types";

const Home = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const {
    data,
    error,
    isLoading: todosLoading,
    mutate,
  } = useSWR("/api/todos", fetcher);

  const [me, setMe] = useState<Me>();
  const [newEntry, setNewEntry] = useState("");
  const [changeError, setChangeError] = useState<string>();

  useEffect(() => {
    const getAndSetMe = async () => {
      setMe(await fetchMe().catch(() => ({ user: null, canEdit: false })));
    };

    getAndSetMe();
  }, []);

  // Runs an add or delete, then reloads the list (or shows what went wrong).
  const change = async (makeChange: () => Promise<unknown>) => {
    try {
      await makeChange();
      setChangeError(undefined);
      await mutate();
    } catch (e) {
      setChangeError(e instanceof Error ? e.message : String(e));
    }
  };

  const add = (event: SubmitEvent) => {
    event.preventDefault();
    change(async () => {
      await createEntry(newEntry);
      setNewEntry("");
    });
  };

  if (todosLoading || !me) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Infinite To-Do List</h1>
      <ul>
        {data?.projects?.map((todo: Entry) => (
          <li key={todo.id}>
            {todo.name}
            {me.canEdit && (
              <button
                type="button"
                className="ml-2 text-sm underline"
                onClick={() => change(() => destroyEntry(todo.id))}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      {me.canEdit && (
        <form onSubmit={add}>
          <input
            aria-label="New entry"
            className="border px-1"
            required
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
          <button type="submit" className="ml-2 border px-2">
            Add
          </button>
        </form>
      )}
      {changeError && <p>{changeError}</p>}
      <p>
        {me.user ? (
          `Logged in as ${me.user.name}`
        ) : (
          <a href="/auth">Log in</a>
        )}
      </p>
    </main>
  );
};

export default Home;
