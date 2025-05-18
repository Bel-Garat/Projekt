const zapisDao = require("../../dao/zapisDao");
const studentDao = require("../../dao/studentDao");

module.exports = (req, res) => {
  const { predmetId } = req.params;
  const zapisy = zapisDao.listByPredmet(predmetId);
  const studenti = zapisy.map(z => studentDao.getById(z.studentId));
  res.json(studenti);
};