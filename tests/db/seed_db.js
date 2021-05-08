const DeviceModel = require("../../src/device/model");

const seedDB = async () => {
  try {
    await DeviceModel.insertMany([
      {
        device: "Apple",
        os: "Catalina",
        manufacturer: "India",
      },
      {
        device: "Android",
        os: "Pie",
        manufacturer: "India",
      },
      {
        device: "Test Brand",
        os: "Test OS",
        manufacturer: "USA",
      },
    ]);
  } catch (err) {
    console.log(err);
  }
};

seedDB();
