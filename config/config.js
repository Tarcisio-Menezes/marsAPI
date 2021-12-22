require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_URL,
    host: process.env.HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_URL,
    host: process.env.HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_URL,
    host: process.env.HOST,
    dialect: 'mysql',
  },
};
