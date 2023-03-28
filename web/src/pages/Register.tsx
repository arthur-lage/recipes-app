import { FormEvent, useState } from "react";
import { Header } from "../components/Header";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../services/api";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { FormInput } from "../components/FormInput";
import { At, LockKey, User } from "phosphor-react";

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
    <div className="bg-app-bg h-screen">
      <main className="flex flex-col items-center justify-center h-full">
        <h1 className="font-nunito font-bold text-3xl mb-10 text-white tracking-wider">
          Register
        </h1>

        <form className="flex flex-col" onSubmit={handleRegister}>
          <div className="flex flex-col items-center gap-5">
            <FormInput
              icon={
                <User
                  weight="bold"
                  className="text-2xl text-main-blue absolute top-1/2 -translate-y-1/2 left-3"
                />
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="Username"
            />

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

          <FormSubmitButton hoverTitle="Register" buttonTitle="Register" />
        </form>

        <Link className="font-nunito mt-8 font-medium text-white" to="/login">
          Already have an account? Login
        </Link>
      </main>
    </div>
  );
}
