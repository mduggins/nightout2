var mongoose = require('mongoose');

var planSchema = new mongoose.Schema({
  userId: String,
  sites: Array
});

module.exports = mongoose.model('Plan', planSchema)
