import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import { useCookies } from "react-cookie";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
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

      <h1>Login</h1>

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>

      <Link to="/register">Don't have an account yet? Register</Link>
    </div>
  );
}
