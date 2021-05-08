const express = require("express");
const router = express.Router();
const DeviceDAO = require("../device/dao");

router.get("/", async (req, res) => {
  const devices = await DeviceDAO.getAllDevices();
  if (devices) return res.status(200).send(devices);
  return res.status(200).send("No devices found");
});

/**
 * saving device details
 * @params device, os, manufacturer,
 */

router.post("/", async (req, res) => {
  try {
    const devices = await DeviceDAO.getAllDevices();
    if (devices.length >= 10) {
      return res
        .status(200)
        .send({ error: true, message: "device not allowed more then 10" });
    } else {
      const devices = await DeviceDAO.createDevice(req);
      if (devices)
        return res
          .status(201)
          .send({ message: "Device inserted successfully", data: devices });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * delete device
 * @params deviceId
 * @author Sitesh Ranjan <siteshr@chimeratechnologies>
 */

router.delete("/:deviceId", async (req, res) => {
  const response = await DeviceDAO.deleteDevice(req.params.deviceId);
  if (response.deletedCount) return res.status(200).send(response);
  return res.status(200).send("device with the given ID in not found");
});

module.exports = router;
