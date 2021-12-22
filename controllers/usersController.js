const joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/userServices');

const userRegister = rescue(async (req, res, next) => {
  const { error } = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    image: joi.string(),
  }).validate(req.body);

  if (error) return next(error);

  const { name, email, password, image } = req.body;

  const result = await service.userRegister({ name, email, password, image });
  if (result.error) return next(result.error);
  return res.status(201).json(result);
});

const getAllUsers = rescue(async (req, res, next) => {
  const { email } = req.user;

  const users = await service.getAllUsers(email);
  if (users.error) return next(users.error);
  return res.status(200).json(users);
});

const getUserById = rescue(async (req, res, next) => {
  const { email } = req.user;
  const { id } = req.params;

  const selectedUser = await service.getUserById(id, email);
  if (selectedUser.error) return next(selectedUser.error);
  return res.status(200).json(selectedUser);
});

const removeUser = rescue(async (req, res, _next) => {
  const { email } = req.user;
  await service.removeUser(email);
  return res.status(204).send();
});

module.exports = {
  userRegister,
  getAllUsers,
  getUserById,
  removeUser,
};
