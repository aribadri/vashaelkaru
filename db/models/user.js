'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      this.hasMany(Order, {foreignKey: 'user_id' });
      // define association here
    }
  };
  User.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};
