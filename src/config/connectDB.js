const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('jwt_nodejs', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database has been connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;