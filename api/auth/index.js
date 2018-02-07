const AuthController = require('./auth.controller.js')

const init = server => {
  const authController = AuthController.create()

  server.route({
    method: 'POST',
    path: '/api/auth/signin',
    handler: (request, reply) => {
      return authController
        .signin(request)
        .then(reply)
        .catch(reply)
    },
    config: {
      auth: false,
    },
  })

  server.route({
    method: 'POST',
    path: '/api/auth/signup',
    handler: (request, reply) => {
      return authController
        .signup(request)
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
