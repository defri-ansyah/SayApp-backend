'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_room_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chat_room_detail.hasOne(models.users, {
        foreignKey: 'id',
        sourceKey: 'from_user_id'
      })
    }
  };
  chat_room_detail.init({
    room_id: DataTypes.INTEGER,
    from_user_id: DataTypes.INTEGER,
    chat: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'chat_room_detail',
  });
  return chat_room_detail;
};