const express = require("express");
const app = express();
const morgan = require("morgan");
const deviceAPI = require("./src/device/api");
const feedbackAPI = require("./src/feedback/api");
const cors = require("cors");
app.use(cors());

require("./src/config/db")();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/devices", deviceAPI);
app.use("/api/feedback", feedbackAPI);

const port = 5000;

const server = app.listen(port, () => {
  console.log(`Project Server listening at http://localhost:${port}`);
});

module.exports = server;
