import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function AddStudent() {
  const [jmeno, setJmeno]         = useState("");
  const [prijmeni, setPrijmeni]   = useState("");
  const [email, setEmail]         = useState("");
  const [datum, setDatum]         = useState("");
  const [error, setError]         = useState(null);
  const navigate = useNavigate();

  const clearForm = () => {
    setJmeno(""); setPrijmeni(""); setEmail(""); setDatum(""); setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // klientská validace
    if (!jmeno || !prijmeni || !email || !datum) {
      setError("Vyplň všechna povinná pole.");
      return;
    }

    try {
      const res = await fetch("/student/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jmeno, prijmeni, email, datumNarozeni: datum }),
      });
      if (res.status === 409) {
        setError("Student s tímto emailem již existuje.");
      } else if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Neznámá chyba na serveru.");
      } else {
        alert("Student vytvořen!");
        clearForm();
      }
    } catch (err) {
      setError("Síťová chyba: " + err.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Přidat studenta</h2>
      {error && <div className="form-error">{error}</div>}

      <label>Jméno<sup>*</sup></label>
      <input value={jmeno} onChange={e=>setJmeno(e.target.value)} />

      <label>Příjmení<sup>*</sup></label>
      <input value={prijmeni} onChange={e=>setPrijmeni(e.target.value)} />

      <label>Email<sup>*</sup></label>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} />

      <label>Datum narození<sup>*</sup></label>
      <input type="date" value={datum} onChange={e=>setDatum(e.target.value)} />

      <div className="form-buttons">
        <button type="button" className="btn-warning" onClick={clearForm}>Smazat</button>
        <button type="submit" className="btn-success">Vytvořit</button>
      </div>
      <button type="button" className="btn-danger btn-close" onClick={()=>navigate("/")}>
        Zavřít
      </button>
    </form>
  );
}
