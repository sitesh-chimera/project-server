const express = require("express");
const router = express.Router();
const moment = require("moment");
const CheckInOutDAO = require("./dao");

function validateTime(startTime, endTime) {
  const format = "hh:mm:ss";
  const time = moment(moment(), format),
    checkOutstartTime = moment(startTime, format),
    checkOutEndTime = moment(endTime, format);
  if (!time.isBetween(checkOutstartTime, checkOutEndTime)) return true;
}

/**
 * checkout device with unique name
 * checking validation
 */

router.put("/:deviceId", async (req, res) => {
  try {
    const isExist = await CheckInOutDAO.existingCheckOutUser(
      req.body.lastCheckOutBy
    );

    if (isExist)
      return res.status(200).send({
        error: true,
        message: "Device already checkout by this user.",
      });

    const startTime = req.body.startTime ? req.body.startTime : "09:00:00";
    const endTime = req.body.endTime ? req.body.endTime : "17:00:00";

    if (validateTime(startTime, endTime))
      return res.status(200).send({
        error: true,
        message: "check out can performed between 9:00 AM to 17:00 AM",
      });

    const response = await CheckInOutDAO.checkOutDevice(
      req.params.deviceId,
      req.body.lastCheckOutBy
    );
    if (response)
      return res.status(201).send({ message: "check-out done succesfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});

router.patch("/:deviceId", async (req, res) => {
  try {
    const response = await CheckInOutDAO.checkInDevice(req.params.deviceId);
    if (response)
      return res.status(200).send({ message: "check-in done successfully." });
  } catch (err) {
    throw new Error("something went wrong");
  }
});

module.exports = router;
