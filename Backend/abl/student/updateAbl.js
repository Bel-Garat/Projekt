const studentDao = require("../../dao/studentDao");

module.exports = (req, res) => {
  const { id, jmeno, prijmeni, datumNarozeni, email } = req.body;
  if (!id || !jmeno || !prijmeni || !datumNarozeni || !email) {
    return res.status(400).json({ error: "dtoInIsNotValid" });
  }
  const updated = studentDao.update({ id, jmeno, prijmeni, datumNarozeni, email });
  if (!updated) return res.status(404).json({ error: "studentNotFound" });
  res.json(updated);
};