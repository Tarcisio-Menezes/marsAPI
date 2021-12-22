const router = require('express').Router();
const controller = require('../controllers/favoriteController');
const auth = require('../middlewares/authMiddleware');

router.post('/favorite', auth, controller.favoriteRegister);
router.get('/favorite', auth, controller.getAllFavorites);
router.get('/favorite/:id', auth, controller.getFavoriteById);
router.put('/favorite/:id', auth, controller.updateFavorite);
router.delete('/favorite/:id', auth, controller.removeFavorite);

module.exports = router;
