class UserRepository {
  constructor(db, { User }) {
    this.db = db
    this.User = User
  }

  static create(db, model) {
    return new UserRepository(db, model)
  }

  queryDB(query) {
    return this.db.query(query).then(res => res.rows)
  }

  getUserByEmail(email) {
    const query = {
      text: 'SELECT * FROM "user" WHERE email=$1',
      values: [email],
    }

    return this.queryDB(query).then(rows => {
      if (!rows.length) return null
      return this.User.createFromDB(rows[0])
    })
  }

  checkEmailExists(email) {
    const query = {
      text: 'SELECT COUNT(1)::int FROM "user" WHERE email=$1',
      values: [email],
    }

    return this.queryDB(query).then(rows => rows[0].count > 0)
  }

  saveUser(user) {
    const query = {
      text: 'INSERT INTO "user" (email, password_hash) VALUES ($1, $2) RETURNING *',
      values: [user.email, user.passwordHash],
    }

    return this.queryDB(query).then(rows => this.User.createFromDB(rows[0]))
  }
}

module.exports = UserRepository
