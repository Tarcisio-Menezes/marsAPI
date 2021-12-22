const express = require('express');
const cors = require('cors');
const usersRoutes = require('../routes/usersRoute');
const usersMiddleware = require('../middlewares/usersMiddleware');
const usersMiddlewareName = require('../middlewares/usersMiddlewareName');
const favoriteRoutes = require('../routes/favoritesRoute');
const favoriteMiddleware = require('../middlewares/favoriteMiddleware');
const loginRoutes = require('../routes/loginRoute');
const loginMiddleware = require('../middlewares/loginMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(usersRoutes);
app.use(usersMiddleware);
app.use(usersMiddlewareName);

app.use(favoriteRoutes);
app.use(favoriteMiddleware);

app.use(loginRoutes);
app.use(loginMiddleware);

module.exports = app;
