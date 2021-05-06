const DeviceModel = require("../device/model");

class FeedBackDAO {
  /**
   * Saving the device data to the DB
   */

  static async createFeedback(deviceId, feedback) {
    const data = {
      feedback: feedback,
    };
    const result = await DeviceModel.findByIdAndUpdate(deviceId, data, {
      new: true,
    });
    return result;
  }
}

module.exports = FeedBackDAO;
