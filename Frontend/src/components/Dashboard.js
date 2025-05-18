import React from "react";
import { Link } from "react-router-dom";
import "./Form.css"; 
export default function Dashboard() {
  return (
    <div className="form-container">
      <h2>StudentCourse</h2>
      <nav className="dashboard-nav">
        <Link className="btn-link" to="/add-student">Přidat studenta</Link>
        <Link className="btn-link" to="/add-subject">Přidat předmět</Link>
        <Link className="btn-link" to="/add-zapis">Zapsat studenta</Link>
        <Link className="btn-link" to="/filter">Filtr</Link>
      </nav>
    </div>
  );
}
