const mongoose = require("mongoose");
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

module.exports = function () {
  mongoose
    .connect(`${DATABASE_URL}/${DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to MongoDB....`);
    })
    .catch((err) => console.log("Could not connect to MongoDB....", err));
};
