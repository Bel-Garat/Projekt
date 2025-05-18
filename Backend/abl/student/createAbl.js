const studentDao = require("../../dao/studentDao");

module.exports = (req, res) => {
  const { jmeno, prijmeni, datumNarozeni, email } = req.body;

  if (!jmeno || !prijmeni || !datumNarozeni || !email) {
    return res.status(400).json({ error: "dtoInIsNotValid" });
  }

  if (studentDao.getByEmail(email)) {
    return res.status(409).json({ error: "studentAlreadyExists" });
  }

  const student = studentDao.create({ jmeno, prijmeni, datumNarozeni, email });
  res.status(201).json(student);
};
