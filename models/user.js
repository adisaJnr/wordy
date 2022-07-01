const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // occupation: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    about: String,
    image: String,
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

module.exports = { User };
