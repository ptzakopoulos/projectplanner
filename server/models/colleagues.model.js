const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ColleagueSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Colleague", ColleagueSchema);
