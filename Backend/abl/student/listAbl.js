const studentDao = require("../../dao/studentDao");

module.exports = (req, res) => {
  const studenti = studentDao.list();
  res.json(studenti);
};