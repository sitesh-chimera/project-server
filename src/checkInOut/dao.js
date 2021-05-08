const DeviceModel = require("../device/model");

class CheckInOutDAO {
  static async checkInDevice(deviceId) {
    const data = {
      isCheckedOut: 1,
    };
    const result = await DeviceModel.findByIdAndUpdate(deviceId, data, {
      new: true,
    });
    return result;
  }

  static async existingCheckOutUser(checkOutBy) {
    const response = await DeviceModel.find({
      lastCheckedOutBy: new RegExp("^" + checkOutBy + "$", "i"),
    });
    if (response.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  static async checkOutDevice(deviceId, checkOutBy) {
    const data = {
      lastCheckedOutDate: Date.now(),
      lastCheckedOutBy: checkOutBy,
      isCheckedOut: 2,
    };
    const result = await DeviceModel.findByIdAndUpdate(deviceId, data, {
      new: true,
    });
    return result;
  }
}

module.exports = CheckInOutDAO;
