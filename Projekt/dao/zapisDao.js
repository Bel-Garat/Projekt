const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dirPath = path.join(__dirname, "storage");
const filePath = path.join(dirPath, "zapis.json");

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

module.exports = {
  create(zapis) {
    const zapisy = loadData();
    const id = crypto.randomUUID();
    const newZapis = { id, ...zapis };
    zapisy.push(newZapis);
    saveData(zapisy);
    return newZapis;
  },

  find(studentId, predmetId) {
    return loadData().find((z) => z.studentId === studentId && z.predmetId === predmetId);
  },

  list() {
    return loadData();
  },

  listByStudent(studentId) {
    return loadData().filter((z) => z.studentId === studentId);
  },

  listByPredmet(predmetId) {
    return loadData().filter((z) => z.predmetId === predmetId);
  },

  remove(id) {
    const zapisy = loadData();
    const index = zapisy.findIndex((z) => z.id === id);
    if (index !== -1) zapisy.splice(index, 1);
    saveData(zapisy);
  },
};
