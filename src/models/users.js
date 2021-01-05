'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasOne(models.chat_room_detail, {
        foreignKey: 'from_user_id'
      })
    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    username: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    status: DataTypes.ENUM('online', 'offline'),
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};