const auth = require('./auth.js')

const init = deps => Promise.all([auth.init(deps)])

module.exports = {
  init,
}
