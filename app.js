require("dotenv").config();
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser'); 
const cors = require("cors");
var mysql = require('mysql');
var session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
const mailer = require("./utils/mailer");
const users = require("./routes/users");
const books = require("./routes/books");
const auth = require("./routes/auth");
var passport = require('passport');

// EXPRESS SERVER INSTANCE
const app = express();

// SESSION MYSQL DATABASE
var options = {
	connectionLimit: 10,
  host: process.env.HOSTSQL,
  port: process.env.PORTSQL,
  user: process.env.USERMYSQL,
  password: process.env.PASSWORD,
  database: process.env.DATABASESQL
};

var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}/* session store options */, connection);

// Initialize & use Passport library
app.use(passport.initialize());
app.use(passport.session());

// Use Express Session
app.use(session({
	key: 'e9a37dc2d704e1ab7ae0352b18cdcba4030e2df90ba5401cc55f29c8b8cc4124',
	secret: '9c8b8e9a3ba#@30e2',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
  currentUser: sessionStore
}));

// CORS MIDDLEWARE SETUP
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ROUTER MIDDLEWARE
app.use("/auth", auth);
app.use("/mail", mailer);
app.use("/users", users);
app.use("/books", books);

// ROUTE FOR SERVING REACT APP (index.html)
app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

// ERROR HANDLING
app.use((req, res, next) => {
    res.status(404).json({ code: "not found" });
    res.redirect('/error');
  });
  
  app.use((err, req, res, next) => {
    // always log the error
    console.error("ERROR", req.method, req.path, err);
  
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      const statusError = err.status || "500";
      res.status(statusError).json(err);
    }
  });
  
  module.exports = app;