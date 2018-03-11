const AuthService = require('./auth.service.js')

const init = (repository) => {
  const initResult = {
    authService: AuthService.create(repository),
  }

  return Promise.resolve(initResult)
}

module.exports = {
  init,
}
