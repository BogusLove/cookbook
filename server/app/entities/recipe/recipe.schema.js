const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
	title: String,
	description: String,
	rating: Number,
	createdAt: String,
	updatedAt: String
}, {
	versionKey: false
});

module.exports = mongoose.model('Recipe', Recipe);
