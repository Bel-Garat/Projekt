const studentListCtrl = require("./controller/student/list");
const studentGetCtrl = require("./controller/student/get");
const studentUpdateCtrl = require("./controller/student/update");
const studentRemoveCtrl = require("./controller/student/remove");

const predmetListCtrl = require("./controller/predmet/list");
const predmetGetCtrl = require("./controller/predmet/get");
const predmetUpdateCtrl = require("./controller/predmet/update");
const predmetRemoveCtrl = require("./controller/predmet/remove");

const zapisListCtrl = require("./controller/zapis/list");
const zapisListStudentCtrl = require("./controller/zapis/listStudent");
const zapisListPredmetCtrl = require("./controller/zapis/listPredmet");
const zapisRemoveCtrl = require("./controller/zapis/remove");
const predmetCreateCtrl = require("./controller/predmet/create");
const zapisFilterCtrl = require("./controller/zapis/filter");

const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const studentCreate = require("./controller/student/create");
const predmetCreate = require("./controller/predmet/create");
const zapisCreate = require("./controller/zapis/create");
const zapisFilter = require("./controller/zapis/filter");
const filterAbl = require("./abl/zapis/filterAbl");

app.post("/student/create", studentCreate);
app.post("/predmet/create", predmetCreate);
app.post("/zapis/create", zapisCreate);
app.get("/zapis/filter", filterAbl);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});

app.get("/student/list", studentListCtrl);
app.get("/student/:id", studentGetCtrl);
app.put("/student/update", studentUpdateCtrl);
app.delete("/student/:id", studentRemoveCtrl);

app.get("/predmet/list", predmetListCtrl);
app.get("/predmet/:id", predmetGetCtrl);
app.put("/predmet/update", predmetUpdateCtrl);
app.delete("/predmet/:id", predmetRemoveCtrl);

app.get("/zapis/list", zapisListCtrl);
app.get("/zapis/student/:studentId", zapisListStudentCtrl);
app.get("/zapis/predmet/:predmetId", zapisListPredmetCtrl);
app.delete("/zapis/:id", zapisRemoveCtrl);
app.get("/zapis/filter", zapisFilterCtrl);