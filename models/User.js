const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	name: {
		type: String,
		maxlength: 50,
		unique: true
	},
	username: {
		type: String,
		maxlength: 20,
		unique: true
	},
	email: {
		type: String,
		maxlength: 50,
		unique: true
	},
	password: {
		type: String,
	},

});

module.exports = mongoose.model('User',User);