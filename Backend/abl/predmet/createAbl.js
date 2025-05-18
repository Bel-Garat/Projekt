const predmetDao = require("../../dao/predmetDao");
const crypto = require("crypto");

module.exports = (req, res) => {
  const { nazev, ucitel, ucebna } = req.body;

  if (!nazev || !ucitel || !ucebna) {
    return res.status(400).json({ error: "dtoInIsNotValid" });
  }

  if (predmetDao.getByNazev(nazev)) {
    return res.status(409).json({ error: "predmetAlreadyExists" });
  }

  const predmet = predmetDao.create({ nazev, ucitel, ucebna });
  res.status(201).json(predmet);
};