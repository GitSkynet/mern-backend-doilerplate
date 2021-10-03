/*
Routes of authentication user. Login, Signin, Logout, private page, admin page...
Connected to a MySQL Database and protected password of users with bcrypJS
See the file /helpers/middlewares to view and understand the flow of authentication
This is the authentication method base. For authentication with passportJS, go to
/routes/passport/ to view the strategies to login/signup with Ouath 2.0
*/
const express = require("express");
const router = express.Router();
const axios = require("axios");
const createError = require("http-errors");
const bcryptjs = require("bcryptjs");
const pool = require('../ddbb/poolDatabase');
const saltRounds = 10;

// Helpers functions
const { isLoggedIn, isNotLoggedIn, validationLoggin, } = require("../helpers/middlewares");


// Router [POST] SignUp
router.post ("/signup", isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await pool.query('SELECT * FROM usuarios WHERE ?', [{email:email}]);
    if (userExists.length == 0){
      const salt = bcryptjs.genSaltSync(saltRounds);
      const hashPass = bcryptjs.hashSync(password, salt);
      const newUser = await pool.query(`INSERT INTO usuarios (name, email, password) VALUES ('${name}','${email}', '${hashPass}');`);
      const userSession = await pool.query('SELECT * FROM usuarios WHERE ?', [{id: newUser.insertId}]);
      req.session.currentUser = userSession;
      res.send({status: 200, message: `User ${name} created succesfull`, created: true });
    }
    else {
      res.send({status: 200, message: `${email} already exists`, exists: true });
    }
  } catch (error) {
    next(error);
  }
});

// Router [POST] Login
router.post("/login", isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM usuarios WHERE ?', [{email:email}]);
    if (user.length == 0) {
      res.send({ status: 201, message: "This user doesn't exist", data: [] });
    }
    else if (bcryptjs.compareSync(password, user[0].password)) {
      var theUser = user[0];
      req.session.currentUser = {name: theUser.name, email: theUser.email, id: theUser.id };
      res.send({ status: 200, message: "Logueado!", data: theUser });
    } else {
      res.send({ status: 400, message: "Incorrect password, try again", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
});

// Router [POST] Logout
router.post("/logout", isLoggedIn(), (req, res, next) =>{
  req.session.destroy();
  res.send({ status: 200, message: "Logout succesfull" });
  return;
})


// Router [GET] Private
router.get("/private", isLoggedIn(), (req, res, next)=>{
  res
    .status(200) // OK
    .json({
      message: "Test - User is logged in"
    });
});

// Router [GET] My profile
router.get("/me", isLoggedIn(), (req, res, next)=>{
  req.session.currentUser.password = "";
  res.json(req.session.currentUser);
})

module.exports = router;