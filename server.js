const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const userRoute = require("./api/routes/user");
const app = express();

app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Content-Security-Policy', "img-src 'self'");

    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
// Routes

app.use("/", userRoute);

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


if(process.env.NODE_ENV == "production"){
	const path = require('path')
	app.use(express.static(path.join(__dirname, '/webapp/build')))

	app.get('*',(req, res) => {
		res.sendFile(path.join(__dirname, 'webapp', 'build', 'index.html'))
	});
}
else{
	const morgan = require("morgan");
	app.use(morgan("dev"));
}


// Create server

app.listen(process.env.PORT || 5000, () => {
	console.log(
		`Server Started...`
	);
});