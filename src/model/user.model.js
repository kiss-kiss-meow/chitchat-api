class User {
  constructor(options = {}) {
    this.id = options.id
    this.email = options.email
    this.passwordHash = options.passwordHash
  }

  static create(options) {
    return new User(options)
  }

  static createFromDB(options = []) {
    if (Array.isArray(options)) return options.map(o => User.createFromDB(o))

    options.passwordHash = options.password_hash
    return new User(options)
  }
}

module.exports = User
