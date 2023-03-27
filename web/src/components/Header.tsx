import { Link } from "react-router-dom";

export function Header({ isLoggedIn = true }) {
  return (
    <header>
      <Link to="/">Recipes</Link>

      {isLoggedIn ? (
        <ul>
          <li>
            <Link to="/recipes/new">New Recipe</Link>
          </li>
          <li>
            <Link to="/recipes/saved">Saved Recipes</Link>
          </li>
          <li>
            <button>Log out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </header>
  );
}
