const User = require('./user.model.js')

const init = () => {
  const initResult = {
    User,
  }

  return Promise.resolve(initResult)
}

module.exports = {
  init,
}
