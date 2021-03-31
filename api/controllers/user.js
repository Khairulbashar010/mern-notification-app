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
	const name = req.params.id;
	User.findOne({name: new RegExp('^'+name+'$', "i")}, function(err, data) {
		if(data === null){
			res.status(500).json({
				message: "Error occured",
				data,
			});
		}
		else{
			res.status(200).json({
				message: "User Found",
				data,
			});
		}
	  });
};

// Create new user controller
const createUserController = (req, res, next) => {
	const { name } = req.body;

	const user = new User({
		name
	});
	user.save()
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


module.exports = {
	getAllUserController,
	createUserController,
	getOneUserController,
};