const jwt = require('jsonwebtoken')
const config = require('config')
const Boom = require('boom')
const bcrypt = require('bcrypt')

const jwtSecretKey = process.env.JWT_SECRET

class AuthService {
  constructor({ userRepository }, { User }) {
    this.userRepository = userRepository
    this.User = User
  }

  static create(repository, model) {
    return new AuthService(repository, model)
  }

  static encryptJwt(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          email: user.email,
          tokenType: config.jwt.tokenType,
        },
        jwtSecretKey,
        {
          algorithm: config.jwt.algorithm,
        },
        (err, token) => {
          if (err) {
            reject(err)
          } else {
            resolve(token)
          }
        }
      )
    })
  }

  static encryptData(data) {
    return bcrypt.hashSync(data, 10)
  }

  static verifyHash(plaintext, hash) {
    return bcrypt.compareSync(plaintext, hash)
  }

  static isUserValid(user, password) {
    return user && AuthService.verifyHash(password, user.passwordHash)
  }

  signin(email, password) {
    return this.userRepository.getUserByEmail(email).then(user => {
      if (!AuthService.isUserValid(user, password)) throw Boom.unauthorized('Incorrect email or password!')

      const tokenPayload = { email: user.email }

      return AuthService.encryptJwt(tokenPayload)
    })
  }

  signup(email, password) {
    const passwordHash = AuthService.encryptData(password)
    const user = this.User.create({ email, passwordHash })

    // TODO: remove passwordHash info from token (in model layer)
    return this.userRepository.saveUser(user).then(userCreated => AuthService.encryptJwt(userCreated))
  }
}

module.exports = AuthService
