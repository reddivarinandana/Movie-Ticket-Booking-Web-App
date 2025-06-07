import React from "react";

const Navbar = ({ searchTerm, setSearchTerm, token }) => (
  <nav className="navbar">
    <div className="logo">🎬 MovieBook</div>
    <input
      className="search-bar"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {token && <div className="login-status">Logged In</div>}
  </nav>
);

export default Navbar;