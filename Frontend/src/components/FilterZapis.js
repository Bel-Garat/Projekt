import React, { useState } from "react";
import "./Form.css";

export default function FilterZapis({ onSearch, results = [] }) {
  const [studentsChecked, setStudentsChecked] = useState(true);
  const [subjectsChecked, setSubjectsChecked] = useState(true);
  const [query, setQuery]                     = useState("");
  const [error, setError]                     = useState(null);

  const clearAll = () => {
    setStudentsChecked(true);
    setSubjectsChecked(true);
    setQuery("");
    setError(null);
  };

  const handleSearchClick = () => {
    if (!studentsChecked && !subjectsChecked) {
      setError("Vyber minimálně jednu kategorii.");
      return;
    }
    setError(null);
    onSearch({
      includeStudents: studentsChecked,
      includeSubjects: subjectsChecked,
      query
    });
  };

  return (
    <div className="form-container">
      <h2>Filtrovat data</h2>
      {error && <div className="form-error">{error}</div>}

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={studentsChecked}
            onChange={e => setStudentsChecked(e.target.checked)}
          />
          <span>Studenti</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={subjectsChecked}
            onChange={e => setSubjectsChecked(e.target.checked)}
          />
          <span>Předměty</span>
        </label>
      </div>

      <label>Hledaný text<sup>*</sup></label>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="form-buttons">
        <button className="btn-warning" onClick={clearAll}>Smazat</button>
        <button className="btn-success" onClick={handleSearchClick}>Vyhledat</button>
      </div>
      <button className="btn-danger btn-close" onClick={() => window.history.back()}>
        Zavřít
      </button>

      {/* --- Zobrazení výsledků pod formulářem --- */}
      {results.length > 0 && (
        <div className="results">
          <h3>Výsledky hledání:</h3>
          <ul>
            {results.map((item, idx) => (
              <li key={idx}>
                {item.jmeno
                  ? `${item.jmeno} ${item.prijmeni}`
                  : item.nazev
                }
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.length === 0 && query && !error && (
        <div className="form-error">Nic nenalezeno.</div>
      )}
    </div>
  );
}
