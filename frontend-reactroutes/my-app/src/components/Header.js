import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
      </nav>
    </header>
  );
}
