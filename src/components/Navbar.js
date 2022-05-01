import React from "react";
import { Link } from "react-router-dom";
import { Switch, Button } from "@material-ui/core";
import { useGlobalContext } from "../context";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation().pathname;
  const { darkMode, setDarkMode } = useGlobalContext();
  return (
    <nav className="navbar">
      <div className="nav-center">
        {location != "/" && <Link to="/">{"<back"}</Link>}
        <ul className="nav-links">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/Dinner-Reservation">dinner reservation</Link>
          </li>
        </ul>
      </div>
      <Switch
        checked={darkMode}
        onChange={() => {
          setDarkMode(!darkMode);
        }}
      />
    </nav>
  );
}
