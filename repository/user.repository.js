class UserRepository {
  constructor(db) {
    this.db = db
  }

  static create(db) {
    return new UserRepository(db)
  }

  getUserByEmail(email) {
    const query = {
      text: 'SELECT * FROM "user" WHERE email=$1',
      values: [email],
    }

    return this.db
      .query(query)
      .then(res => res.rows[0])
      .catch(err => {
        throw err
      });
  }

  saveUser(user) {
    const query = {
      text: 'INSERT INTO "user" (email, password_hash) VALUES ($1, $2) RETURNING *',
      values: [user.email, user.passwordHash],
    }

    return this.db
      .query(query)
      .then(res => res.rows[0])
      .catch(err => {
        throw err
      })
  }
}

module.exports = UserRepository
