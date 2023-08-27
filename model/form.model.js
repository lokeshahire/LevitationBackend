const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address1: String,
  address2: String,
  city: String,
  state: String,
  pincode: Number,
  country: String,
  files: [],
  select: String,
  latitude: Number,
  longitude: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const FormModel = mongoose.model("form", formSchema);

module.exports = {
  FormModel,
};
