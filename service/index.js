const AuthService = require('./auth.service.js')

const init = (repository, model) => {
  const initResult = {
    authService: AuthService.create(repository, model),
  }

  return Promise.resolve(initResult)
}

module.exports = {
  init,
}
