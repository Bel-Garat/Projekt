const zapisDao   = require("../../dao/zapisDao");
const studentDao = require("../../dao/studentDao");
const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const { jmeno, prijmeni, nazev } = req.query;

  // 1) Hledání předmětů podle studenta
  if (jmeno || prijmeni) {
    // Najděte studenty podle jména/příjmení
    const students = studentDao
      .list()
      .filter(s =>
        (!jmeno    || s.jmeno.toLowerCase().includes(jmeno.toLowerCase())) &&
        (!prijmeni || s.prijmeni.toLowerCase().includes(prijmeni.toLowerCase()))
      );

    // Pokud nejsou nalezeni, vraťte prázdný seznam
    if (students.length === 0) {
      return res.json([]);
    }

    // Sbírejte ID předmětů, na které mají studenti zápis
    const subjectIds = new Set();
    students.forEach(s => {
      const zapisy = zapisDao.listByStudent(s.id);
      zapisy.forEach(z => subjectIds.add(z.predmetId));
    });

    // Získejte předměty podle ID
    const subjects = Array.from(subjectIds)
      .map(id => predmetDao.getById(id))
      .filter(p => p);

    return res.json(subjects);
  }

  // 2) Hledání studentů podle předmětu
  if (nazev) {
    // Najděte předměty podle názvu
    const subjects = predmetDao
      .list()
      .filter(p => p.nazev.toLowerCase().includes(nazev.toLowerCase()));

    if (subjects.length === 0) {
      return res.json([]);
    }

    // Sbírejte ID studentů, kteří mají zápis u těchto předmětů
    const studentIds = new Set();
    subjects.forEach(p => {
      const zapisy = zapisDao.listByPredmet(p.id);
      zapisy.forEach(z => studentIds.add(z.studentId));
    });

    // Získejte studenty podle ID
    const studentsForSubjects = Array.from(studentIds)
      .map(id => studentDao.getById(id))
      .filter(s => s);

    return res.json(studentsForSubjects);
  }

  // Neplatné vstupní DTO
  return res.status(400).json({ error: "dtoInIsNotValid" });
};
