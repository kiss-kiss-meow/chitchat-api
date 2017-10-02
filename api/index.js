const itemsApi = require('./items')

const init = server => {
  const apis = [itemsApi]

  apis.forEach(api => api.init(server))
}

module.exports = {
  init,
}
