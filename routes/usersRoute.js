const router = require('express').Router();
const controller = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');

router.post('/user', controller.userRegister);
router.get('/user', auth, controller.getAllUsers);
router.get('/user/:id', auth, controller.getUserById);
router.delete('/user/me', auth, controller.removeUser);

module.exports = router;
