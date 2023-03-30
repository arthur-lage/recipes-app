import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { FormEvent, useState } from "react";
import { api } from "../services/api";
import { useCookies } from "react-cookie";
import { FormInput } from "../components/auth/FormInput";

import { At, LockKey } from "phosphor-react";
import { FormSubmitButton } from "../components/auth/FormSubmitButton";

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
    <div className="bg-app-bg h-screen">
      <main className="flex flex-col justify-center h-full items-center">
        <h1 className="font-nunito font-bold text-3xl mb-10 text-white tracking-wider">
          Login
        </h1>

        <form className="flex flex-col" onSubmit={handleLogin}>
          <div className="flex items-center flex-col gap-5">
            <FormInput
              icon={
                <At
                  weight="bold"
                  className="text-2xl text-main-blue absolute top-1/2 -translate-y-1/2 left-3"
                />
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
            />
            <FormInput
              icon={
                <LockKey
                  weight="bold"
                  className="text-2xl text-main-blue absolute top-1/2 -translate-y-1/2 left-3"
                />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <FormSubmitButton buttonTitle="Login" hoverTitle="Login" />
        </form>

        <Link
          className="font-nunito mt-8 font-medium text-white"
          to="/register"
        >
          Don't have an account yet? Register
        </Link>
      </main>
    </div>
  );
}
