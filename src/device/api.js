const express = require("express");
const router = express.Router();
const DeviceDAO = require("../device/dao");

router.get("/", async (req, res) => {
  const devices = await DeviceDAO.getAllDevices();
  if (devices) return res.status(200).send(devices);
  return res.status(404).send("No devices found");
});

router.post("/", async (req, res) => {
  try {
    const devices = await DeviceDAO.createDevice(req);
    if (devices) return res.status(201).send(devices);
  } catch (err) {
    console.log(err);
  }

  return res.status(404).send("something went wrong please try again", devices);
});

module.exports = router;
