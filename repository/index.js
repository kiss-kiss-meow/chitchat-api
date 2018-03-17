const UserRepository = require('./user.repository.js')

const init = (db, model) => {
  const initResult = {
    userRepository: UserRepository.create(db, model),
  }

  return Promise.resolve(initResult)
}

module.exports = {
  init,
}
