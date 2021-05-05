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

  static async createDevice() {
    console.log("test");
    const device = new DeviceModel({
      device: "Moto",
      os: "Android",
      manufacturer: "India",
    });
    try {
      return await device.save();
    } catch (err) {
      return err;
    }
  }
}

module.exports = DeviceDAO;
