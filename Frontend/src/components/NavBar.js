import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/add-student" style={{ marginRight: "15px" }}>Přidat studenta</Link>
      <Link to="/add-subject" style={{ marginRight: "15px" }}>Přidat předmět</Link>
      <Link to="/add-zapis" style={{ marginRight: "15px" }}>Zapsat studenta</Link>
      <Link to="/filter">Filtr</Link>
    </nav>
  );
}