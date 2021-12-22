const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

// lógica adaptada de https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
const validEmail = (email) => {
  if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm)) return true;
  return false;
};

const validName = (name) => {
  if (name.length >= 8) return true;
  return false;
};

const validPass = (pass) => {
  if (pass.length === 6) return true;
  return false;
};

const existingUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const tokenGenerator = (email, password) => {
  const secret = process.env.JWT_SECRET;
  
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const payload = {
    email,
    password,
  };

  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

const isValidUser = async (email) => {
  const validUser = await existingUser(email);
  if (!validUser) {
    return ({
      error: { code: 'inexistingUser' },
    });
  } return validUser;
};

const validLogin = async (email, password) => {
  const user = await existingUser(email);
  if (user && user.password === password) return true;
  return false;
};

module.exports = {
  validEmail,
  validName,
  validPass,
  tokenGenerator,
  existingUser,
  isValidUser,
  validLogin,
};
