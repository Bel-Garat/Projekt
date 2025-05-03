const express = require("express");
const app = express();
app.use(express.json());

const studentCreate = require("./controller/student/create");
const predmetCreate = require("./controller/predmet/create");
const zapisCreate = require("./controller/zapis/create");
const zapisFilter = require("./controller/zapis/filter");

app.post("/student/create", studentCreate);
app.post("/predmet/create", predmetCreate);
app.post("/zapis/create", zapisCreate);
app.get("/zapis/filter", zapisFilter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});