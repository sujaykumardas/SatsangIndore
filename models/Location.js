const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Location = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  nearby_address: {
    type: String
  },

},{
    collection: 'locations'
});

module.exports = mongoose.model('Location', Location);