"use strict";

const mongoose = require("mongoose");
const courtsSchema = mongoose.Schema({
  sfcourts: Array
});

const Courts = mongoose.model("Court", courtsSchema);
module.exports = Courts;
