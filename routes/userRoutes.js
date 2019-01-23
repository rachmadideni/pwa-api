const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.get('/user', userController.userList)
router.get('/user/:id', userController.userData)
router.post('/signup', authController.signup)
// router.post('/signin', authController.signin)

module.exports = router