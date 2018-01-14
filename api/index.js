const itemsApi = require('./items')
const authApi = require('./auth')

const init = server => {
  const apis = [authApi, itemsApi]

  apis.forEach(api => api.init(server))
}

module.exports = {
  init,
}
