'use strict';

import mongoose from 'mongoose';
const courtsSchema = mongoose.Schema({
  sfcourts: Array,
});

module.exports = mongoose.model('Court', courtsSchema);
