const User = require("../models/User");

// Get all user controller
const getAllUserController = (req, res, next) => {
	User.find({})
		.then((user) => {
			res.status(200).json({
				message: "All Users",
				user,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: "Error occured",
				err,
			});
		});
};

// Get one user controller
const getOneUserController = (req, res, next) => {
	const { id } = req.params;
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

// Create new user controller
const createUserController = (req, res, next) => {
	const { name } = req.body;

	const user = new User({
		name
	});
	user
		.save()
		.then((data) => {
			res.status(201).json({
				message: "User Created",
				data,
			});
		})
		.catch((err) => {
			res.json({
				message: err.message,
				res: null
			});
		});
};


// Delete user controller
const deleteUserController = (req, res, next) => {
	const { id } = req.params;
	User.findByIdAndDelete(id)
		.then((data) => {
			res.status(200).json({
				message: "User Deleted",
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
	getAllUserController,
	createUserController,
	getOneUserController,
	deleteUserController,
};