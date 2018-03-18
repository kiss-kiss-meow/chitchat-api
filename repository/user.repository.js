class UserRepository {
  constructor(db, { User }) {
    this.db = db
    this.User = User
  }

  static create(db, model) {
    return new UserRepository(db, model)
  }

  getUserByEmail(email) {
    const query = {
      text: 'SELECT * FROM "user" WHERE email=$1',
      values: [email],
    }

    return this.db.query(query).then(res => {
      if (!res.rows.length) return null
      return this.User.createFromDB(res.rows[0])
    })
  }

  saveUser(user) {
    const query = {
      text: 'INSERT INTO "user" (email, password_hash) VALUES ($1, $2) RETURNING *',
      values: [user.email, user.passwordHash],
    }

    return this.db.query(query).then(res => this.User.createFromDB(res.rows[0]))
  }
}

module.exports = UserRepository
