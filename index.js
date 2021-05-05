const express = require("express");
const morgan = require("morgan");
const deviceAPI = require("./src/device/api");
require("./src/config/db")();
const app = express();
app.use(express.json());
app.use(morgan("combined"));

app.use("/api/devices", deviceAPI);
const port = 5000;

const server = app.listen(port, () => {
  console.log(`Project Server listening at http://localhost:${port}`);
});

module.exports = server;
