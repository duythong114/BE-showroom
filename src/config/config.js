require('dotenv').config

// console.log("dialect: ", process.env.DB_DIALECT)

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    // "username": "postgres",
    // "password": "662001",
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    // "dialect": "postgres",
    "logging": false,
    "timezone": "+07:00",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    },
    dialectOptions: process.env.DB_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}