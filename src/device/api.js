const express = require("express");
const router = express.Router();
const DeviceDAO = require("../device/dao");
const moment = require("moment");

function validateTime(startTime, endTime) {
  const format = "hh:mm:ss";
  const time = moment(moment(), format),
    checkOutstartTime = moment(startTime, format),
    checkOutEndTime = moment(endTime, format);
  if (!time.isBetween(checkOutstartTime, checkOutEndTime)) return true;
}

router.get("/", async (req, res) => {
  const devices = await DeviceDAO.getAllDevices();
  if (devices) return res.status(200).send(devices);
  return res.status(404).send("No devices found");
});

/**
 * saving device details
 * @params device, os, manufacturer,
 */

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

/**
 * delete device
 * @params deviceId
 * @author Sitesh Ranjan <siteshr@chimeratechnologies>
 */

router.delete("/:deviceId", async (req, res) => {
  const response = await DeviceDAO.deleteDevice(req.params.deviceId);
  if (response.deletedCount) return res.status(200).send(response);
  return res.status(404).send("device with the given ID in not found");
});

/**
 * checkout device with unique name
 */

router.put("/:deviceId", async (req, res) => {
  try {
    const isExist = await DeviceDAO.existingCheckOutUser(
      req.body.lastCheckOutBy
    );

    if (isExist)
      return res.status(404).send("device already checkout by this user.");

    const startTime = req.body.startTime ? req.body.startTime : "09:00:00";
    const endTime = req.body.endTime ? req.body.endTime : "17:00:00";

    if (validateTime(startTime, endTime))
      return res
        .status(404)
        .send("check out can performed between 9:00 AM to 17:00 AM");

    const response = await DeviceDAO.checkOutDevice(
      req.params.deviceId,
      req.body.lastCheckOutBy
    );
    if (response) return res.status(200).send(response);
  } catch (err) {
    throw new Error("something went wrong");
  }
});

module.exports = router;
