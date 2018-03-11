class AuthController {

  constructor({ authService }) {
    this.authService = authService
  }

  static create(service) {
    return new AuthController(service)
  }

  signin({ payload = {} }) {
    const { email, password } = payload
    return this.authService.signin(email, password)
  }

  signup({ payload = {} }) {
    const { email, password } = payload
    return this.authService.signup(email, password)
  }
}

module.exports = AuthController
