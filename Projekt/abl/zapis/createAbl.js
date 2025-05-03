const studentDao = require("../../dao/studentDao");
const predmetDao = require("../../dao/predmetDao");
const zapisDao = require("../../dao/zapisDao");
const crypto = require("crypto");

module.exports = (req, res) => {
  const { studentId, predmetId } = req.body;

  if (!studentId || !predmetId) {
    return res.status(400).json({ error: "dtoInIsNotValid" });
  }

  if (!studentDao.getById(studentId)) {
    return res.status(404).json({ error: "studentNotFound" });
  }

  if (!predmetDao.getById(predmetId)) {
    return res.status(404).json({ error: "predmetNotFound" });
  }

  if (zapisDao.find(studentId, predmetId)) {
    return res.status(409).json({ error: "zapisAlreadyExists" });
  }

  const zapis = zapisDao.create({ studentId, predmetId });
  res.status(201).json(zapis);
};