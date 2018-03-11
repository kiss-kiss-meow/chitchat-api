const itemsApi = require('./items')
const authApi = require('./auth')

const init = (server, service) => {
  const apis = [authApi, itemsApi]
  const initResult = apis.map(api => api.init(server, service))

  return Promise.resolve(initResult)
}

module.exports = {
  init,
}
