const zapisDao = require("../../dao/zapisDao");
const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const { studentId } = req.params;
  const zapisy = zapisDao.listByStudent(studentId);
  const predmety = zapisy.map(z => predmetDao.getById(z.predmetId));
  res.json(predmety);
};