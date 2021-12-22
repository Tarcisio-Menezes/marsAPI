const router = require('express').Router();
const controller = require('../controllers/loginController');

router.post('/login', controller.userLogin);

module.exports = router;
