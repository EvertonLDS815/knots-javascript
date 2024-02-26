const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const knotsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  nivel: {
    type: String,
    require: true,
    default: 'Básico'
  },
  type: {
    type: String,
    require: true,
  },
  linkImage: {
    type: String,
  },
  linkVideo: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("No", knotsSchema);
