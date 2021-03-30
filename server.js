const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./api/routes/user");
const messageRoute = require("./api/routes/message");

const app = express();

if(process.env.NODE_ENV == "production"){
	const path = require('path')
	app.use(express.static(path.join(__dirname, '/weabapp/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'));

	});
}
else{
	const morgan = require("morgan");
	const cors = require("cors");
	app.use(morgan("dev"));
	app.use(cors())
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Database Connected...");
	})
	.catch((err) => {
		console.error(`db error: ${err.message}`);
	});

// Routes

app.use("/", userRoute);
app.use("/message", messageRoute);


// Create server

app.listen(process.env.PORT || 5000, () => {
	console.log(
		`Server Started...`
	);
});