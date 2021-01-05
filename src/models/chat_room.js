'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chat_room.hasMany(models.chat_room_member, {
        foreignKey: 'room_id',
        as: 'current_user'
      })
      models.chat_room.hasMany(models.chat_room_member, {
        foreignKey: 'room_id',
        as: 'members'
      })
      models.chat_room.hasOne(models.chat_room_detail, {
        foreignKey: 'room_id',
        as: 'last_chat'
      })
    }
  };
  chat_room.init({
    room_name: DataTypes.STRING,
    room_type: DataTypes.ENUM('private', 'group'),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chat_room',
  });
  return chat_room;
};