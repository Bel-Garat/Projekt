const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const { id, nazev, ucitel, ucebna } = req.body;
  if (!id || !nazev || !ucitel || !ucebna) {
    return res.status(400).json({ error: "dtoInIsNotValid" });
  }
  const updated = predmetDao.update({ id, nazev, ucitel, ucebna });
  if (!updated) return res.status(404).json({ error: "predmetNotFound" });
  res.json(updated);
};