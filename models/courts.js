"use strict"; 

var mongoose = require("mongoose"); 
var courtsSchema = mongoose.Schema({
	sfcourts: Array 
});

var Courts = mongoose.model("Court", courtsSchema);
module.exports = Courts; 