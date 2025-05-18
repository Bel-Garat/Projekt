const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const predmety = predmetDao.list();
  res.json(predmety);
};