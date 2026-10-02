// Backend-agnostic shapes. Code outside src/lib/backend/ only ever sees
// these, never the database's or auth provider's own types.

export type Entry = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
};

export type Me = {
  user: User | null;
};
