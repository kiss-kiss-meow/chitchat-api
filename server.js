const Hapi = require('hapi')
const WebSocket = require('ws')
const config = require('config')
const api = require('./api')
const ws = require('./ws')

const { port } = config.get('server')
const { port: wssPort } = config.get('wss')

const server = new Hapi.Server()
server.connection({ port })
api.init(server)

server.start(err => {
  if (err) throw err
  console.log(`Server running at: ${server.info.uri}`)
})

const wss = new WebSocket.Server({ port: wssPort })
ws.init(wss)
