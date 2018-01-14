const AuthController = require('./auth.controller.js')

const init = server => {
  const authController = AuthController.create()

  server.route({
    method: 'POST',
    path: '/api/auth/signin',
    handler: (request, reply) => {
      const { payload } = request || {}
      const { email, password } = payload
      return authController
        .signin(email, password)
        .then(reply)
        .catch(reply)
    },
    config: {
      auth: false,
    },
  })
}

module.exports = {
  init,
}
