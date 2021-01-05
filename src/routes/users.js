const express = require('express');
const router = express.Router();
const {fileUpload} = require('../middlewares/upload')
const {verifyAccess} = require('../middlewares/auth');
const userControllers = require('../controllers/userControllers');

router.get('/', userControllers.getAllUser);
router.post('/signup', userControllers.createUser);
router.post('/login', userControllers.login);
router.get('/detail', verifyAccess, userControllers.getDetail);
router.patch('/update-image', verifyAccess, fileUpload, userControllers.updateImage);
router.patch('/update-map', verifyAccess, userControllers.editMap);
router.patch('/edit-profile', verifyAccess, userControllers.editProfile);

module.exports = router;