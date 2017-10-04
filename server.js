require('dotenv').config()

const Hapi = require('hapi')
const WebSocket = require('ws')
const config = require('config')
const api = require('./api')
const ws = require('./ws')
const aop = require('./aop')

const { port } = config.get('server')
const { port: wssPort } = config.get('wss')

const server = new Hapi.Server()
server.connection({ port })
api.init(server)

const wss = new WebSocket.Server({ port: wssPort })
ws.init(wss)

Promise.all([aop.init({ server })])
  .then(() => {
    server.start(err => {
      if (err) throw err
      console.log(`Server running at: ${server.info.uri}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
