const createError = require('http-errors');
const axios = require('axios');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) next();
  else{
    return res.send({ status: 200, message: "NO estás logeado", loggedIn: false });
  };
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) next();
  else {
    res.send({ status: 200, message: "Ya estás logeado", loggedIn: true });
  };
};

exports.validationLoggin = () => (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) next(createError(400));
  else next();
}