import { FormEvent, useState } from "react";
import { Header } from "../components/Header";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../services/api";

export function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      setCookies("access_token", data.token);
      localStorage.setItem("recipes::userId", data.userId);
      navigate("/");
    } catch (error) {
      console.error("Error", error);
    }
  }
  return (
    <div>
      <Header />

      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Username..."
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Email..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password..."
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}
