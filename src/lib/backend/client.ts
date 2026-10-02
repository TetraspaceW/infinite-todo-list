// Browser half of the backend black box: signing in, and proving to our own
// API who is signed in. Swapping backends means rewriting this folder.

// Better Auth keeps the login in a cookie the browser sends by itself, so
// requests to our API need no extra headers.
export const authHeaders = async (): Promise<Record<string, string>> => ({});

const signIn = async (path: string, body: object) => {
  const response = await fetch(`/api/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callbackURL: "/", ...body }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const { url } = await response.json();
  window.location.assign(url ?? "/");
};

export const signInWithDiscord = () =>
  signIn("sign-in/social", { provider: "discord" });

// Email/password needs enabling in ./auth.ts first.
export const signInWithPassword = (email: string, password: string) =>
  signIn("sign-in/email", { email, password });

export const signUp = (email: string, password: string) =>
  signIn("sign-up/email", { email, password, name: email });
