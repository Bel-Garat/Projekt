const studentDao = require("../../dao/studentDao");

module.exports = (req, res) => {
  const { id } = req.params;
  const removed = studentDao.remove(id);
  if (!removed) return res.status(404).json({ error: "studentNotFound" });
  res.json({ message: "Student removed" });
};