const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		minLength: 3,
		unique: true
	}
});

module.exports = User = mongoose.model("User", userSchema);