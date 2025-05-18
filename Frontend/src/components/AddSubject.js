import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function AddSubject() {
  const [nazev, setNazev]     = useState("");
  const [ucitel, setUcitel]   = useState("");
  const [ucebna, setUcebna]   = useState("");
  const [error, setError]     = useState(null);
  const navigate = useNavigate();

  const clearForm = () => {
    setNazev(""); setUcitel(""); setUcebna(""); setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nazev || !ucitel || !ucebna) {
      setError("Vyplň všechna povinná pole.");
      return;
    }
    try {
      const res = await fetch("/predmet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nazev, ucitel, ucebna }),
      });
      if (res.status === 409) {
        setError("Předmět s tímto názvem již existuje.");
      } else if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Chyba na serveru.");
      } else {
        alert("Předmět vytvořen!");
        clearForm();
      }
    } catch (err) {
      setError("Síťová chyba: " + err.message);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Přidat předmět</h2>
      {error && <div className="form-error">{error}</div>}

      <label>Název<sup>*</sup></label>
      <input value={nazev} onChange={e=>setNazev(e.target.value)} />

      <label>Učitel<sup>*</sup></label>
      <input value={ucitel} onChange={e=>setUcitel(e.target.value)} />

      <label>Učebna<sup>*</sup></label>
      <input value={ucebna} onChange={e=>setUcebna(e.target.value)} />

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
