const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceSchema = new Schema({
  device: { type: String, required: true },
  os: { type: String, required: true },
  manufacturer: { type: String, required: true },
  lastCheckedOutDate: { type: Date, default: null },
  lastCheckedOutBy: { type: String, default: null },
  isCheckedOut: { type: Boolean, default: false },
  feedBack: { type: String, default: null },
});

const DeviceModel = mongoose.model("Device", deviceSchema);
module.exports = DeviceModel;
