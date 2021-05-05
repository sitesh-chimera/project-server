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
    return res
      .status(404)
      .send("something went wrong please try again", devices);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:deviceId", async (req, res) => {
  const response = await DeviceDAO.deleteDevice(req.params.deviceId);
  if (response.deletedCount) return res.status(200).send(response);
  return res.status(404).send("device with the given ID in not found");
});

router.put("/:deviceId", async (req, res) => {
  const response = await DeviceDAO.checkOutDevice(
    req.params.deviceId,
    req.body.lastCheckOutBy
  );
  if (response) return res.status(200).send(response);
  return res.status(404).send("something went wring please try again.");
});

module.exports = router;
