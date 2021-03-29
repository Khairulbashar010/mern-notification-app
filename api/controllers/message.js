const User = require("../models/User");


// Message Controller
const viewMessage = (req, res, next) => {
	const id = req.query.uId;
	User.findById(id)
		.then((data) => {
				res.status(200).json({
					message: "User Found",
					data,
				});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured",
				err,
			});
		});
};

module.exports = {
	viewMessage
};