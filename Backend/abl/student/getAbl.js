const studentDao = require("../../dao/studentDao");

module.exports = (req, res) => {
  const { id } = req.params;
  const student = studentDao.get(id);
  if (!student) return res.status(404).json({ error: "studentNotFound" });
  res.json(student);
};