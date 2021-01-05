const express = require ('express');
const router = express.Router();
const users = require('./users');
const chat = require('./chat')
const room = require('./room')
// const routeProducts = require('./products')
// const orders = require('./orders')
// const history = require('./history')

router.use('/user', users)
router.use('/chat', chat)
router.use('/room', room)
// router.use('/products', routeProducts)
// router.use('/order', orders)
// router.use('/history', history)


module.exports = router
