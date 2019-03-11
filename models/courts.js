"use strict";

const mongoose = require("mongoose");
const courtsSchema = mongoose.Schema({
  sfcourts: Array
});

module.exports = mongoose.model("Court", courtsSchema);
