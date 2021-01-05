const express = require('express');
const router = express.Router();
const {fileUpload} = require('../middlewares/upload')
const {verifyAccess} = require('../middlewares/auth');
const chatControllers = require('../controllers/chatControllers');

router.post('/send', verifyAccess, chatControllers.sendMessage);
// router.post('/signup', userControllers.createUser);
// router.post('/login', userControllers.login);
// router.patch('/update-image', verifyAccess, fileUpload, userControllers.updateImage);
// router.patch('/edit-password', verifyAccess, authController.editPassword);


module.exports = router;