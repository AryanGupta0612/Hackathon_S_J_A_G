import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/logo.png"; // adjust if path differs
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo / Brand */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="CareFinder Logo" className="logo-img" />
        </Link>

        {/* Navigation links */}
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/notices"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Notices
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
