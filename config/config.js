require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
