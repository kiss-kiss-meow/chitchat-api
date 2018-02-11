const itemsApi = require('./items')
const authApi = require('./auth')

const init = (server, service) => {
  const apis = [authApi, itemsApi]

  apis.forEach(api => api.init(server, service))
}

module.exports = {
  init,
}
