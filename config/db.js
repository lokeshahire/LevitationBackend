const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = mongoose.connect(
  "mongodb+srv://lokesh:ahire@cluster0.entjnlc.mongodb.net/Levitation"
);

module.exports = {
  dbConnection,
};
