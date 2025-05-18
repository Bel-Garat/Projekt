const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const { id } = req.params;
  const predmet = predmetDao.get(id);
  if (!predmet) return res.status(404).json({ error: "predmetNotFound" });
  res.json(predmet);
};