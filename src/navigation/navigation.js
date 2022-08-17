
import React from "react";
import {  Link } from "react-router-dom";
import "./nav.css";

const Navigation = () => {
  return (
    <>
      <div className="nav-bar">
        <Link className="links" to="/">Home</Link>
        <Link className="links" to="/login">login</Link>
        <Link className="links" to="/logout">Logout</Link>
      </div>
    </>
  );
};
export default Navigation;