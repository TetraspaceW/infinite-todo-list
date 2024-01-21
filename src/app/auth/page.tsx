"use client";

import { useState } from "react";
import { supabase } from "../supabase";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
  };

  const register = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
      options: {
        emailRedirectTo: "https://todo.thetetra.space/",
      },
    });
  };

  const loginWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  };

  return (
    <main>
      <div>
        <h1>Login Page</h1>
        <form>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={login}>
            Login
          </button>
          <button type="button" onClick={register}>
            Register
          </button>
          <button type="button" onClick={loginWithDiscord}>
            Login with Discord
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
