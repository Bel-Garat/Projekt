const zapisDao = require("../../dao/zapisDao");

module.exports = (req, res) => {
  const { id } = req.params;
  const removed = zapisDao.remove(id);
  if (!removed) return res.status(404).json({ error: "zapisNotFound" });
  res.json({ message: "Zápis odstraněn" });
};