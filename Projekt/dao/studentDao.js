const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dirPath = path.join(__dirname, "storage");
const filePath = path.join(dirPath, "student.json");

function ensureStorageFile() {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
}

function loadData() {
  ensureStorageFile();
  return JSON.parse(fs.readFileSync(filePath));
}

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Mám tu více DAO metod 
// Chtěl bych si je postupně na zkoušku přidat

module.exports = {
  create(student) {
    const students = loadData();
    const id = crypto.randomUUID();
    const newStudent = { id, ...student };
    students.push(newStudent);
    saveData(students);
    return newStudent;
  },

  getById(id) {
    return loadData().find((s) => s.id === id);
  },

  getByEmail(email) {
    return loadData().find((s) => s.email === email);
  },

  list() {
    return loadData();
  },

  update(updatedStudent) {
    const students = loadData();
    const index = students.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) students[index] = updatedStudent;
    saveData(students);
    return updatedStudent;
  },

  remove(id) {
    const students = loadData();
    const index = students.findIndex((s) => s.id === id);
    if (index !== -1) students.splice(index, 1);
    saveData(students);
  }
};
