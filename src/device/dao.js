const DeviceModel = require("./model");

class DeviceDAO {
  /**
   * getting all the device from DB
   */

  static async getAllDevices() {
    await DeviceModel.find();
  }

  /**
   * Saving the device data to the DB
   */

  static async createDevice(req) {
    const deviceDetails = new DeviceModel({
      device: req.body.device,
      os: req.body.os,
      manufacturer: req.body.manufacturer,
    });
    try {
      return await deviceDetails.save();
    } catch (err) {
      return err;
    }
  }
}

module.exports = DeviceDAO;
