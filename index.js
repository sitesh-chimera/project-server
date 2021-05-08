const express = require("express");
const app = express();
const morgan = require("morgan");
const deviceAPI = require("./src/device/api");
const feedbackAPI = require("./src/feedback/api");
const checkInOutAPI = require("./src/checkInOut/api");
const cors = require("cors");
require("dotenv").config();
app.use(cors());

require("./src/config/db")();

app.use(express.json());
app.use(morgan("combined"));

app.use("/api/devices", deviceAPI);
app.use("/api/feedback", feedbackAPI);
app.use("/api/check-in-out", checkInOutAPI);

const port = process.env.APP_PORT;
const server = app.listen(port, () => {
  console.log(`Project Server listening at http://localhost:${port}`);
});

module.exports = server;
