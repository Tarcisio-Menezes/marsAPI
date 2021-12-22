const joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/favoriteServices');

const favoriteRegister = rescue(async (req, res, next) => {
  const { error } = joi.object({
    imagePath: joi.string().required(),
    rover: joi.string().required(),
    camera: joi.string().required(),
    landing: joi.string().required(),
    launch: joi.string().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { email } = req.user;
  const { imagePath, rover, camera, landing, launch,
    published, updated } = req.body;

  const favorite = { imagePath, rover, camera, landing, launch, published, updated };

  const result = await service.favoriteRegister(favorite, email);
  if (result.error) return next(result.error);
  return res.status(201).json(result);
});

const getAllFavorites = rescue(async (_req, res, _next) => {
  const result = await service.getAllFavorites();
  return res.status(200).json(result);
});

const getFavoriteById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await service.getFavoriteById(id);
  if (result.error) return next(result.error);
  return res.status(200).json(result);
});

const updateFavorite = rescue(async (req, res, next) => {
  const { error } = joi.object({
    imagePath: joi.string().required(),
    rover: joi.string().required(),
    camera: joi.string().required(),
    landing: joi.string().required(),
    launch: joi.string().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { id } = req.params;
  const { imagePath, rover, camera, landing, launch } = req.body;
  
  const favorite = { imagePath, rover, camera, landing, launch, id };
  const { email } = req.user;
  const result = await service.updateFavorite(favorite, email);
  if (result.error) return next(result.error);
  return res.status(200).json(result);
});

const removeFavorite = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.user;
  const result = await service.removeFavorite(id, email);
  if (result.error) return next(result.error);
  return res.status(204).send();
});

module.exports = {
 favoriteRegister,
  getAllFavorites,
  getFavoriteById,
  updateFavorite,
  removeFavorite,
};
