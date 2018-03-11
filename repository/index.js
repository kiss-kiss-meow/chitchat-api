const UserRepository = require('./user.repository.js')

const init = (db) => {
  const initResult = {
    userRepository: UserRepository.create(db)
  }

  return Promise.resolve(initResult)
}

module.exports = {
  init,
}
