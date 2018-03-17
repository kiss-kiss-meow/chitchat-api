const jwt = require('jsonwebtoken')
const config = require('config')
const Boom = require('boom')
const bcrypt = require('bcrypt')

const jwtSecretKey = process.env.JWT_SECRET

class AuthService {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  static create(repository) {
    return new AuthService(repository)
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
    return user && AuthService.verifyHash(password, user.password_hash)
  }

  signin(email, password) {
    return this.userRepository
      .getUserByEmail(email)
      .then(user => {
        if (!AuthService.isUserValid(user, password)) throw Boom.unauthorized('Incorrect email or password!')

        const tokenPayload = { email: user.email }

        return AuthService.encryptJwt(tokenPayload)
      })
      .catch(err => {
        throw err
      })
  }

  signup(email, password) {
    const passwordHash = AuthService.encryptData(password)
    const user = {
      email,
      passwordHash,
    }

    return this.userRepository
      .saveUser(user)
      .then(userCreated => AuthService.encryptJwt(userCreated)) // TODO: remove passwordHash info from token (in model layer)
      .catch(err => {
        throw err
      })
  }
}

module.exports = AuthService
