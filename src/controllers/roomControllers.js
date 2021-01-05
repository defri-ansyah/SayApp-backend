const express = require('express');
const { Sequelize } = require('../models');
const models = require('../models');
const moment = require('moment')
const Op = Sequelize.Op

const getListByUser = (req, res) => {
  models.chat_room.findAll({
    include: [{
      model: models.chat_room_member,
      as: 'current_user',
      where:{
        user_id: req.userId
      },
    },
    {
      model: models.chat_room_member,
      as: 'members',    
      include: [{
        model: models.users,
      }],
    }, {
      model: models.chat_room_detail,
      as: 'last_chat',
      order: [
        ['last_chat', 'createdAt', 'DESC']
      ]
    }],
  })
    .then((rooms) => {
      if (rooms) {
        rooms.map((room) => {
          if (room.dataValues.room_type === 'private') {
            const members = room.members

            const otherMember = members.filter((member) => {
              return member.dataValues.user_id !== req.userId  
            })[0].dataValues.user.dataValues

            room.dataValues.room_name = otherMember.full_name
            room.dataValues.image = otherMember.image
            room.dataValues.other_user = otherMember
          }

          room.dataValues.last_chat !== null ? room.dataValues.last_chat.dataValues.time =  moment(room.dataValues.last_chat.dataValues.createdAt).format('HH.mm') : null
          return room
        })
        res.status(200).json({
          'status': 'OK',
          'messages': 'get list by user success',
          'data' : rooms
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Chat gagal dikirim',
          'data': {}
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': null,
      })
    })
}

const getChatRoomMessage = (req, res) => {
  const { room_id} = req.params
  models.chat_room_detail.findAll({
    include: [{
      model: models.users
    }],
    where:{
      room_id,
      from_user_id: {
        [Op.ne]: null
      }
    }
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'get list by user success',
          'data' : result
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Chat gagal dikirim',
          'data': {}
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': null,
      })
    })
}

module.exports = { getListByUser, getChatRoomMessage }