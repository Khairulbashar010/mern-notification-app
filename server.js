
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./api/routes/user");

const app = express();

if(process.env.NODE_ENV==="production"){
	app.use(express.static('/webapp/build'));
	const path = require('path')
	app.get("*",(req, res) => {
		res.sendFile(
			path.resolve(__dirname, 'webapp', 'build', 'index.html'),
			path.resolve(__dirname, 'webapp', 'build', 'favicon.ico'),

		)
	})
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
	.connect(process.env.databaseURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log(`Database connected`);
	})
	.catch((err) => {
		console.error(`db error: ${err.message}`);
	});

// Routes

app.use("/", userRoute);


// Create server
const serverPORT = process.env.serverPORT || 5000
app.listen(serverPORT, () => {
	console.log(
		`Server running on "http://localhost:${serverPORT}"`
	);
});