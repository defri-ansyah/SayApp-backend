const express = require('express');
const router = express.Router();
const {fileUpload} = require('../middlewares/upload')
const {verifyAccess} = require('../middlewares/auth');
const roomControllers = require('../controllers/roomControllers');

router.get('/list', verifyAccess, roomControllers.getListByUser);
router.get('/detail/:room_id', roomControllers.getChatRoomMessage);


module.exports = router;