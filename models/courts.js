"use strict"; 

var mongoose = require("mongoose"); 

var courtsSchema = mongoose.Schema({
	sfcourts: Array 
}); 

	// [{
	// 	address: String, 
	// 	name: String, 
	// 	phone: String, 
	// 	type: String, 
	// 	xcoord: Number,
	// 	ycoord: Number
	// }]

var Courts = mongoose.model("Court", courtsSchema);
module.exports = Courts; 