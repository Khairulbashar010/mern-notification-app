const User = require("../models/User");
const admin = require('firebase-admin');
const serviceAccount = require('.././fir-a22ad-firebase-adminsdk-37n2x-1a2a57f132.json');

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
		if(data){
			res.status(200).json({
				message: "User Found",
				data,
			});
		}
		else{
			res.status(500).json({
				message: "User Not Found",
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

// Notify User Controller
 const notifyUserController = (req, res,next) => {
	const { name } = req.body;
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://fir-a22ad.firebaseio.com"
	})

	var message = {
		notification: {
			title: "Notification recieved",
			body: `Notification from ${name}`
		},
		data: {

		},
		android: {
			notification: {
				sound: "default"
			},
		},
		apns: {
			payload: {
				aps: {
					sound : "default",
				},
			},
		},
		topic: "general"
	}

	admin.messaging().send(message)
	.then(res => {
		console.log(`Successfully Sent Notification ${res}`);
	})
	.catch(err => {
		console.log(`Error Sending Notification ${err}`);
	})
 }


module.exports = {
	getAllUserController,
	createUserController,
	getOneUserController,
	notifyUserController,
};