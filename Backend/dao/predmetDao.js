const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dirPath = path.join(__dirname, "storage");
const filePath = path.join(dirPath, "predmet.json");

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
  create(predmet) {
    const predmety = loadData();
    const id = crypto.randomUUID();
    const newPredmet = { id, ...predmet };
    predmety.push(newPredmet);
    saveData(predmety);
    return newPredmet;
  },

  getById(id) {
    return loadData().find((p) => p.id === id);
  },

  getByNazev(nazev) {
    return loadData().find((p) => p.nazev === nazev);
  },

  list() {
    return loadData();
  },

  update(updatedPredmet) {
    const predmety = loadData();
    const index = predmety.findIndex((p) => p.id === updatedPredmet.id);
    if (index !== -1) predmety[index] = updatedPredmet;
    saveData(predmety);
    return updatedPredmet;
  },

  remove(id) {
    const predmety = loadData();
    const index = predmety.findIndex((p) => p.id === id);
    if (index !== -1) predmety.splice(index, 1);
    saveData(predmety);
  },
};
