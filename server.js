var express = require("express");
var path = require("path");
const appConfig = require("./config/app.config.js");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
const FileStore = require("session-file-store")(session);
const dbConfig = require("./config/connect.js");
const mongoose = require("mongoose");

// create express app
var app = express();

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const sessionConfig = {
  name: "app.sid",
  secret: appConfig.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    path: "./session-store",
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 days
};
app.use(session(sessionConfig));
// use cookies
app.use(cookieParser());

mongoose.connection.on("connected", function () {
  // Set the database back to the right one, since I'm using mongodb+srv as protocol.
  if (mongoose.connection.client.s.url.startsWith("mongodb+srv")) {
    mongoose.connection.db = mongoose.connection.client.db("Sleepify");
    console.log("Connection to MongoDB established.");
  }
});
// mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use(require("./app/routes/index.routes"));
app.use(require("./app/routes/home.routes"));
app.use(require("./app/routes/account.routes"));
app.use(require("./app/routes/signup.routes"));
app.use(require("./app/routes/campfire.routes"));
app.use(require("./app/routes/PlaylistSleep.routes"));
app.use(require("./app/routes/PlaylistStudy.routes"));
app.use(require("./app/routes/PlaylistWork.routes"));
app.use(require("./app/routes/rain.routes"));
app.use(require("./app/routes/seaStorm.routes"));

app.use(express.static(__dirname + "/app/scripts/signup.js"));
app.use(express.static(__dirname + "/app/client"));

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});
// Configuring the database
// var usecases = require("./app/routes/usecases");

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// module.exports = app;
