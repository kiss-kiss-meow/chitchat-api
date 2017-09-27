const Hapi = require('hapi')
const WebSocket = require('ws')

const server = new Hapi.Server()

const whiteOrigins = ['*']

server.connection({
  port: '8000',
})

server.route({
  method: 'GET',
  path: '/api/items',
  config: {
    cors: {
      origin: whiteOrigins,
    },
  },
  handler: (req, res) =>
    res([
      {
        id: 1,
        name: 'Item 1',
      },
      {
        id: 2,
        name: 'Item 2',
      },
      {
        id: 3,
        name: 'Item 3',
      },
    ]),
})

server.start(err => {
  if (err) throw err
  console.log(`Server running at: ${server.info.uri}`)
})

const wss = new WebSocket.Server({ port: 8001 })

wss.on('connection', ws => {
  console.log('Connection opened.')

  ws.on('message', msg => {
    // console.log(`received: ${msg}`)
    wss.clients.forEach(client => {
      if (client.readyState !== WebSocket.OPEN) return
      client.send(msg)
    })
  })

  ws.on('close', () => {
    console.log('Connection closed.')
  })
})
