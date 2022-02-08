'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });

      // define association here
    }
  };
  Order.init({
    model: DataTypes.TEXT,
    size: DataTypes.TEXT,
    tel: DataTypes.TEXT,
    adress: DataTypes.TEXT,
    date: DataTypes.TEXT,
    price: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    status: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'Order',
    timestamps: false
  });
  return Order;
};
