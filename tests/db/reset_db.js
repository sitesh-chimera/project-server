const DeviceModel = require("../../src/device/model");
const resetDB = async () => {
  try {
    await DeviceModel.remove({}, true);
    console.log("DB reset successfully....");
  } catch (err) {
    console.log("your server and DB should be running.", err.message);
  }
};

resetDB();
