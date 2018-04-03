const auth = require('./auth.js')
const logging = require('./logging.js')

const init = deps => Promise.all([auth.init(deps), logging.init(deps)])

module.exports = {
  init,
}
