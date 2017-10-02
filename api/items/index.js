const ItemsController = require('./items.controller.js')

const init = server => {
  const itemsController = ItemsController.create()
  const whiteOrigins = ['*']

  server.route({
    method: 'GET',
    path: '/api/items',
    handler: (request, reply) => reply(itemsController.get()),
    config: {
      cors: {
        origin: whiteOrigins,
      },
    },
  })
}

module.exports = {
  init,
}
