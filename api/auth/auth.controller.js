class AuthController {

  constructor(authService) {
    this.authService = authService
  }

  static create(authService) {
    return new AuthController(authService)
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
