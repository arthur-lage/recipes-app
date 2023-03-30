import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex shadow-lg items-center justify-between px-14 py-6 bg-gradient-to-br from-header-gradient-start to-header-gradient-end">
      <Link
        className="duration-150 transition-all hover:text-zinc-200 text-xl font-nunito font-bold text-white"
        to="/"
      >
        Recipes
      </Link>

      <ul className="flex items-center gap-12">
        <li className="header-item">
          <Link to="/recipes/new">New Recipe</Link>
        </li>
        <li className="header-item">
          <Link to="/recipes/saved">Saved Recipes</Link>
        </li>
        <li className="header-item">
          <button>Log out</button>
        </li>
      </ul>
    </header>
  );
}
