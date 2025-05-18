const predmetDao = require("../../dao/predmetDao");

module.exports = (req, res) => {
  const { id } = req.params;
  const removed = predmetDao.remove(id);
  if (!removed) return res.status(404).json({ error: "predmetNotFound" });
  res.json({ message: "Predmet removed" });
};