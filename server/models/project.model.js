const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  links: [
    {
      name: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      AIIcon: {
        type: String,
        required: false,
      },
    },
  ],
  colleagues: [
    {
      role: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
  ],
  domains: [
    {
      name: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
      username: {
        type: String,
        required: false,
      },
      password: {
        type: String,
        required: false,
      },
    },
  ],
  clients: [
    {
      icon: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
  ],
  deadline: {
    type: Date,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
