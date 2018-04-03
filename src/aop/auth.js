const hapiAuthJwt2 = require('hapi-auth-jwt2')

const jwtSecretKey = process.env.JWT_SECRET

const users = {
  1: {
    id: 1,
    email: 'username1@gmail.com',
  },
  2: {
    id: 2,
    email: 'username2@gmail.com',
  },
  3: {
    id: 3,
    email: 'username3@gmail.com',
  },
}

const validate = (decoded, request, callback) => {
  const userId = decoded.id // decoded == jwt payload
  const userExists = !!users[userId]
  return callback(null, userExists)
}

const init = ({ server }) =>
  new Promise((resolve, reject) => {
    server.register(hapiAuthJwt2, err => {
      if (err) reject(err)
      resolve()
    })
  }).then(() => {
    server.auth.strategy('jwt', 'jwt', {
      key: jwtSecretKey,
      validateFunc: validate,
      verifyOptions: {
        algorithms: ['HS256'],
      },
      errorFunc: error => {
        server.log(error)
      },
    })

    server.auth.default('jwt')
  })

module.exports = {
  init,
}
