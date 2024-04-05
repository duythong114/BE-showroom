'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsToMany(models.User, { through: 'User_Payment' })
    }
  };
  Payment.init({
    paymentMethod: DataTypes.STRING,
    amount: DataTypes.STRING,
    paymentTime: DataTypes.TIME,
    paymentDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};