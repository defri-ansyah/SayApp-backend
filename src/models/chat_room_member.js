'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat_room_member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chat_room_member.hasOne(models.users, {
        foreignKey: 'id',
        sourceKey: 'user_id'
      })
      models.chat_room_member.belongsTo(models.chat_room, {
        foreignKey: 'id',
        sourceKey: 'room_id',
        as: 'current_user'
      })
      models.chat_room_member.belongsTo(models.chat_room, {
        foreignKey: 'id',
        sourceKey: 'room_id',
        as: 'members'
      })
    }
  };
  chat_room_member.init({
    room_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'chat_room_member',
  });
  return chat_room_member;
};