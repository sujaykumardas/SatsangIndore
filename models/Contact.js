const mongoose = require('mongoose')
var Schema = mongoose.Schema

var Contact = new Schema({
	name: {
		type: String,
		unique: true
	},
	designation: {
		type: String
	},
	contact_no: {
		type: Number,
		maxlength: 10,
		unique: true 
	}
},{
    collection: 'contacts'
});

module.exports = mongoose.model('Contact',Contact);