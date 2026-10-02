import { useState } from "react";
import {
  signInWithDiscord,
  signInWithPassword,
  signUp,
} from "../lib/backend/client";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithPassword(username, password);
  };

  const register = async () => {
    await signUp(username, password);
  };

  const loginWithDiscord = async () => {
    await signInWithDiscord();
  };

  return (
    <main>
      <div>
        <h1>Login Page</h1>
        <form>
          {
            // <label htmlFor="username">Username</label>
            // <input
            //   id="username"
            //   type="text"
            //   onChange={(e) => setUsername(e.target.value)}
            // />
            // <label htmlFor="password">Password</label>
            // <input
            //   id="password"
            //   type="password"
            //   onChange={(e) => setPassword(e.target.value)}
            // />
            // <button type="button" onClick={login}>
            //   Login
            // </button>
            // <button type="button" onClick={register}>
            //   Register
            // </button>
          }
          <button type="button" onClick={loginWithDiscord}>
            Login with Discord
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
