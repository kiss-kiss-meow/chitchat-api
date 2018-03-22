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

  static createTokenPayload(user) {
    return {
      id: user.id,
      email: user.email,
      tokenType: config.jwt.tokenType,
    }
  }

  static encryptJwt(tokenPayload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        tokenPayload,
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

      return AuthService.encryptJwt(AuthService.createTokenPayload(user))
    })
  }

  signup(email, password) {
    const passwordHash = AuthService.encryptData(password)
    const user = this.User.create({ email, passwordHash })

    return this.userRepository.checkEmailExists(email).then(emailExists => {
      if (emailExists) throw Boom.conflict('That email is taken. Please try another.')

      return this.userRepository
        .saveUser(user)
        .then(userCreated => AuthService.encryptJwt(AuthService.createTokenPayload(userCreated)))
    })
  }
}

module.exports = AuthService
