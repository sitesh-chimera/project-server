const express = require("express");
const router = express.Router();
const FeedbackDAO = require("./dao");

router.put("/:deviceId", async (req, res) => {
  try {
    const feedback = await FeedbackDAO.createFeedback(
      req.params.deviceId,
      req.body.feedback
    );
    if (feedback) return res.status(201).send(feedback);
    return res
      .status(404)
      .send("something went wrong please try again", feedback);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
