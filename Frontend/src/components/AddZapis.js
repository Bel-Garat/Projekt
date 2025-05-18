import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Zapis({ students = [], subjects = [], onEnroll }) {
  const [student, setStudent] = useState(null);
  const [subject, setSubject] = useState(null);
  const [error, setError]     = useState(null);
  const navigate = useNavigate();
  
  if (!students.length && !subjects.length) {
    return (
      <div className="form-container">
        <h2>Zapsat studenta</h2>
        <div className="form-error">
          Žádná data ke zapsání. Nejprve přidej studenta a předmět.
        </div>
        <button
          className="btn-danger btn-close"
          onClick={() => navigate("/")}
        >
          Zavřít
        </button>
      </div>
    );
  }

  const studentOptions = students.map(s => ({
    value: s.id,
    label: `${s.jmeno} ${s.prijmeni}`
  }));
  const subjectOptions = subjects.map(s => ({
    value: s.id,
    label: s.nazev
  }));

  const clearAll = () => {
    setStudent(null);
    setSubject(null);
    setError(null);
  };

  const handleEnroll = async () => {
    if (!student || !subject) {
      setError("Vyber studenta i předmět.");
      return;
    }
    try {
      const res = await fetch("/zapis/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.value,
          predmetId: subject.value
        }),
      });
      if (res.status === 409) {
        setError("Tento zápis již existuje.");
      } else if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error || "Chyba na serveru.");
      } else {
        alert("Student úspěšně zapsán!");
        clearAll();
        onEnroll && onEnroll();
      }
    } catch (err) {
      setError("Síťová chyba: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Zapsat studenta</h2>
      {error && <div className="form-error">{error}</div>}

      <label>Student<sup>*</sup></label>
      <Select
        options={studentOptions}
        value={student}
        onChange={setStudent}
        isClearable
        classNamePrefix="react-select"
      />

      <label>Předmět<sup>*</sup></label>
      <Select
        options={subjectOptions}
        value={subject}
        onChange={setSubject}
        isClearable
        classNamePrefix="react-select"
      />

      <div className="form-buttons">
        <button className="btn-warning" onClick={clearAll}>
          Smazat
        </button>
        <button className="btn-success" onClick={handleEnroll}>
          Zapsat
        </button>
      </div>
      <button
        className="btn-danger btn-close"
        onClick={() => navigate("/")}
      >
        Zavřít
      </button>
    </div>
  );
}
