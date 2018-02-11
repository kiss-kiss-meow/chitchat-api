const AuthService = require('./auth.service.js')

const authService = AuthService.create()

module.exports = {
  authService
}
