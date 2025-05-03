const zapisDao = require("../../dao/zapisDao");
const studentDao = require("../../dao/studentDao");
const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const { jmeno, prijmeni, nazev } = req.query;

  const studenti = studentDao.list();
  const predmety = predmetDao.list();

  // Filtrování studenta podle jména/příjmení
  if (jmeno || prijmeni) {  
    const matchingStudent = studenti.find((s) => {
      return (
        (!jmeno || s.jmeno.toLowerCase().startsWith(jmeno.toLowerCase())) &&
        (!prijmeni || s.prijmeni.toLowerCase().startsWith(prijmeni.toLowerCase()))
      );
    });

    if (!matchingStudent) {
      return res.status(404).json({ error: "studentNotFound" });
    }

    const zapisy = zapisDao.listByStudent(matchingStudent.id);
    const jehoPredmety = zapisy.map((z) => predmetDao.getById(z.predmetId));

    return res.json({
      student: {
        jmeno: matchingStudent.jmeno,
        prijmeni: matchingStudent.prijmeni,
        email: matchingStudent.email
      },
      predmety: jehoPredmety
    });
  }

  // Filtrování předmětu podle názvu
  if (nazev) {    
    const matchingPredmet = predmety.find((p) =>
      p.nazev.toLowerCase().startsWith(nazev.toLowerCase())
    );

    if (!matchingPredmet) {
      return res.status(404).json({ error: "predmetNotFound" });
    }

    const zapisy = zapisDao.listByPredmet(matchingPredmet.id);
    const jehoStudenti = zapisy.map((z) => studentDao.getById(z.studentId));

    return res.json({
      predmet: {
        nazev: matchingPredmet.nazev,
        ucitel: matchingPredmet.ucitel,
        ucebna: matchingPredmet.ucebna
      },
      studenti: jehoStudenti
    });
  }

  return res.status(400).json({ error: "dtoInIsNotValid" });
};