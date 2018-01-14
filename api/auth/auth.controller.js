const jwt = require('jsonwebtoken')
const config = require('config')
const Boom = require('boom')
const bcrypt = require('bcrypt')

const jwtSecretKey = process.env.JWT_SECRET

class AuthController {
  constructor() {
    this.user = {
      email: 'username1@gmail.com',
      passwordHash:
        '$2a$05$.Xin5d616wZK4GdUReveUekKKPGjCqXRUXHR9rVhvIhDRM6zgo7Wy', // Created with online bcrypt utility ('secret1')
    }
  }

  static create() {
    return new AuthController()
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

  static verifyHash(plaintext, hash) {
    return bcrypt.compareSync(plaintext, hash)
  }

  signin(email, password) {
    return new Promise((resolve, reject) => {
      const isPasswordCorrect = AuthController.verifyHash(
        password,
        this.user.passwordHash
      )

      if (this.user.email !== email || !isPasswordCorrect) {
        throw Boom.unauthorized('Wrong email or password!')
      }

      const token = AuthController.encryptJwt({
        email: this.user.email,
      })
      resolve(token)
    })
  }
}

module.exports = AuthController
