import { Link } from "react-router-dom";

import NotFoundIllustration from "../assets/not-found.svg";

export function NotFound() {
  return (
    <div className="bg-gradient-to-br from-not-found-gradient-start to-not-found-gradient-end h-screen flex items-center flex-col justify-center">
      <img
        className="w-72 mb-10"
        src={NotFoundIllustration}
        alt="Page not found - Illustration"
      />

      <h1 className="font-nunito font-bold uppercase text-zinc-200 text-4xl mb-4">
        Not Found
      </h1>

      <p className="text-xl text-white font-nunito mb-8">
        We could not find the page you were looking for!
      </p>

      <Link
        className="hover:underline text-2xl text-white font-bold font-nunito"
        to="/"
      >
        Go Back to Home Page
      </Link>
    </div>
  );
}
