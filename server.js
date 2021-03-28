const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require('serve-favicon');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./api/routes/user");

const app = express();
app.use(morgan("dev"));

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
	const cors = require('cors');
	app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection

const {MONGOURI} = require('./config/keys')
mongoose
	.connect(process.env.MONGOURI, {
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
const PORT = process.env.PORT || 5000

app.listen(process.env.PORT, () => {
	console.log(
		`Server running..`
	);
});