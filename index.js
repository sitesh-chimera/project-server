const express = require("express");
const app = express();
const deviceAPI = require("./src/device/api");
require("./src/config/db")();

app.use("/api/devices", deviceAPI);
const port = 5000;

app.listen(port, () => {
  console.log(`Project Server listening at http://localhost:${port}`);
});
