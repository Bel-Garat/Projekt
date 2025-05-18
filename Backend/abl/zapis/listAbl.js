const zapisDao = require("../../dao/zapisDao");

module.exports = (req, res) => {
  const zapisy = zapisDao.list();
  res.json(zapisy);
};