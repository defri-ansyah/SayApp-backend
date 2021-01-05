const express = require('express');
const moment = require('moment')
const models = require('../models');

const sendMessage = (payload, socket) => {
  const { room_id, chat, file, from_user_id } = payload
  models.chat_room_detail.create({
    room_id,
    from_user_id,
    chat,
    file
  })
    .then((result) => {
      if (result) {
        result.dataValues.time = moment(result.dataValues.createdAt).format('HH.mm')
        console.log(room_id)
        socket.to('room:' + room_id).emit('refresh feed', result)
        // socket.emit('refresh feed', result)
      } else {
        console.log('else')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { sendMessage }