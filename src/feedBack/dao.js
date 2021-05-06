const DeviceModel = require("../device/model");

class FeedBackDAO {
  /**
   * Saving the device data to the DB
   */

  static async createFeedBack(deviceId, feedBack) {
    const data = {
      feedBack: feedBack,
    };
    const result = await DeviceModel.findByIdAndUpdate(deviceId, data, {
      new: true,
    });
    return result;
  }
}

module.exports = FeedBackDAO;
