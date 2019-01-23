const db = require('../config/db')
const UserService = require('./UserService')
const AuthService = require('./AuthService')

const userService = new UserService(db.models.user)
const authService = new AuthService(db.models.user)

module.exports = {
	userService,
	authService
}