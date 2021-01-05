const express = require('express');
// const { DataTypes } = require('sequelize/types');
const helpers = require('../helpers/help')
const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../helpers/email')

const getAllUser = async (req, res) => {
  const user = await models.users.findAll({});
  res.status(200).send({
    status: 200,
    message: 'Berhasil get data user',
    data: user
  });
};

// const createUser = async (req, res) => {
//     try { 
//         const {email, password, phone_number} = req.body;
//         const users = await models.users.create({
//           email,
//           password,
//           phone_number
//         });
//         if (users) {
//           res.status(200).json({
//             'status': 'OK',
//             'messages': 'User berhasil ditambahkan',
//             'data': users,
//           })
//         }
//        } catch (err) {
//          res.status(400).json({
//            'status': 'ERROR',
//            'messages': err.message,
//            'data': {},
//          })
//        }
// }

const createUser = (req, res) => {
  const { full_name, email, password } = req.body
  models.users.findOne({
    where: {
      email: email
    }
  })
    .then((cekEmail) => {
      if (cekEmail != null) {
        res.status(409).json({ 'messages': 'email is already in use' })
      }
      else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            models.users.create({
              full_name,
              email,
              password: hash,
            })
              .then((user) => {
                if (user) {
                  res.status(200).json({
                    'status': 'OK',
                    'messages': 'User berhasil ditambahkan',
                  })
                }
              })
              .catch((err) => {
                res.status(400).json({
                  'status': 400,
                  'messages': err.message,
                  'data': {},
                })
              })
          })
        })
      }
    })
    .catch((err) => {
      res.status(500).json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {},
      })
    })
}

const login = (req, res) => {
  const { email, password } = req.body
  models.users.findOne(
    {
      where: {
        email
      }
    })
    .then((users) => {
      if (users === null) {
        res.status(404).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      }
      isPassword = bcrypt.compareSync(password, users.dataValues.password)
      if (!isPassword) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': 'Wrong Password',
          'data': {},
        })
      } else {
        users.password = undefined
        jwt.sign({ id: users.id, email: users.email }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
          res.status(200).json({
            'status': 'OK',
            'messages': 'User berhasil login',
            'data': users,
            'token': token
          })
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

const getDetail = (req, res) => {
  models.users.findOne(
    {
      where: {
        id: req.userId
      }
    })
    .then((users) => {
      users.password = undefined
      if (users === null) {
        res.status(404).json({
          'status': 'ERROR',
          'messages': 'user not found',
          'data': {},
        })
      } else {
        res.status(200).json({
          'status': '200',
          'messages': 'Get detail success',
          'data': users
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

const editProfile = (req, res) => {
  const { full_name, phone_number, username, bio, longitude, latitude } = req.body;
  models.users.update({
    full_name,
    phone_number,
    username,
    bio
  },
    {
      where: {
        id: req.userId
      }
    }
  )
    .then((users) => {
      users.password = undefined
      if (users) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'Data Berhasil di update'
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Data tidak berhasil di update',
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

const updateImage = (req, res) => {
  const image = `${process.env.BASE_URL}images/${req.file.filename}`;
  models.users.update({ image },
    {
      where: {
        id: req.userId
      }
    })
    .then((result) => {
      if (result) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'image Berhasil di update',
          'data' : {
            image
          }
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'image tidak berhasil di update',
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

const userOnline = (payload, socket) => {
  models.chat_room.findAll({
    include: [{
      model: models.chat_room_member,
      as: 'current_user',
      where:{
        user_id: payload.userId
      }
    }],
  })
    .then((rooms) => {
      if (rooms) {
        console.log('user online: ', payload.userId);
        rooms.forEach(room => {
          socket.join('room:'+room.id)
        })
      } else {
        console.log('else')
      }
    })
    .catch((err) => {
      console.log(err)
    })
    models.chat_room.findAll({
    include: [{
      model: models.chat_room_member,
      as: 'current_user',
      where:{
        user_id: payload.userId
      }
    }],
  })
    .then((rooms) => {
      if (rooms) {
        console.log('user online: ', payload.userId);
        rooms.forEach(room => {
          socket.join('room:'+room.id)
        })
      } else {
        console.log('else')
      }
    })
    .catch((err) => {
      console.log(err)
    })
    models.users.update({
      status: 'online'
    },{
      where:{
        id: payload.userId
      }
  })
  .then((user) => {
    if (user) {
      socket.emit('refresh user status')
      console.log('refresh user status')
    } else {
      console.log('else')
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

const userOffline = (payload, socket) => {
    models.users.update({
      status: 'offline'
    },{
      where:{
        id: payload.userId
      }
  })
  .then((user) => {
    if (user) {
      socket.emit('refresh user status')
      console.log('refresh user status offline')
    } else {
      console.log('else')
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

const editMap = (req, res) => {
  const { longitude, latitude } = req.body;
  models.users.update({
    longitude,
    latitude
  },
    {
      where: {
        id: req.userId
      }
    }
  )
    .then((users) => {
      users.password = undefined
      if (users) {
        res.status(200).json({
          'status': 'OK',
          'messages': 'Data Berhasil di update'
        })
      } else {
        res.status(400).json({
          'status': '400',
          'messages': 'Data tidak berhasil di update',
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

module.exports = { getAllUser, createUser, login, getDetail, editProfile, updateImage, userOnline, userOffline, editMap }