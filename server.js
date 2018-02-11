require('dotenv').config()

const Hapi = require('hapi')
const WebSocket = require('ws')
const config = require('config')
const api = require('./api')
const service = require('./service')
const ws = require('./ws')
const aop = require('./aop')

const { port } = config.get('server')
const { port: wssPort } = config.get('wss')

const server = new Hapi.Server()
server.connection({ port })
api.init(server, service)

const wss = new WebSocket.Server({ port: wssPort })
ws.init(wss)

Promise.all([aop.init({ server })])
  .then(() => {
    server.start(err => {
      if (err) throw err
      server.log(`Server running at: ${server.info.uri}`)
    })
  })
  .catch(err => {
    server.log(err)
  })
