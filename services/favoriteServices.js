const { Favorite, User } = require('../models');
const { isValidUser } = require('../utils/validations');

const favoriteRegister = async (favorite, userEmail) => {
  const { imagePath, rover, camera, landing, launch } = favorite;

    const result = await isValidUser(userEmail);
    const { id } = result;
    if (!result.error) {
      return Favorite.create({ 
        imagePath,
        rover,
        camera, 
        landing, 
        launch, 
        userId: id });
    } return result;
  };

const getAllFavorites = async () => {
  const result = await Favorite.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  return result;
};

const getFavoriteById = async (id) => { 
    const result = await Favorite.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    return result;
};

const updateFavorite = async (favorite, email) => {
  const user = await isValidUser(email);

  const { imagePath, rover, camera, landing, launch, id } = favorite;

  const favorited = await getFavoriteById(id);
  const { userId } = favorited;

  if (user.id === userId) {
    await Favorite.update({ 
      imagePath,
      rover,
      camera,
      landing,
      launch,
      userId }, 
      { where: { id } });
    const newFavorite = await Favorite.findOne({ where: { id } });
    return newFavorite;
  } return ({
      error: { code: 'Unauthorized' },
  });
};

const removeFavorite = async (id, email) => {
  const user = await isValidUser(email);
  const favorited = await getFavoriteById(id);
  const { userId } = favorited;

  if (user.id === userId) {
    return Favorite.destroy({ where: { id } });
  } return ({
    error: { code: 'Unauthorized' },
  });
};

module.exports = {
  favoriteRegister,
  getAllFavorites,
  getFavoriteById,
  updateFavorite,
  removeFavorite,
};
