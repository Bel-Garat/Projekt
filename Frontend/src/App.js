import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard   from "./components/Dashboard";
import AddStudent  from "./components/AddStudent";
import AddSubject  from "./components/AddSubject";
import Zapis        from "./components/AddZapis";
import FilterZapis from "./components/FilterZapis";

function App() {
  const [students, setStudents]           = useState([]);
  const [subjects, setSubjects]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [filterResults, setFilterResults] = useState([]);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      fetch("/student/list").then(r => r.json()),
      fetch("/predmet/list").then(r => r.json())
    ])
      .then(([stu, sub]) => {
        setStudents(stu);
        setSubjects(sub);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(fetchData, []);
  
  const handleSearch = async ({ includeStudents, includeSubjects, query }) => {
    if (!query.trim()) {
      alert("Zadej hledaný text.");
      return;
    }
    
    const params = new URLSearchParams();
    if (includeStudents) {
      params.set("jmeno", query);
    } else if (includeSubjects) {
      params.set("nazev", query);
    } else {
      alert("Vyber alespoň jednu kategorii.");
      return;
    }

    try {
      const res = await fetch(`/zapis/filter?${params.toString()}`);
      if (!res.ok) throw new Error(res.statusText || res.status);
      const data = await res.json();      
      setFilterResults(data);
    } catch (err) {
      console.error(err);
      alert("Při hledání došlo k chybě: " + err.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign:"center", marginTop:"2rem" }}>Načítám data…</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/"                element={<Dashboard />} />
        <Route path="/add-student"     element={<AddStudent />} />
        <Route path="/add-subject"     element={<AddSubject />} />
        <Route
          path="/add-zapis"
          element={<Zapis students={students} subjects={subjects} onEnroll={fetchData} />}
        />
        <Route path="/filter"          element={<FilterZapis onSearch={handleSearch}   results={filterResults}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
