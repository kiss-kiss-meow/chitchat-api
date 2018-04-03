require('dotenv').config()

const Hapi = require('hapi')
const WebSocket = require('ws')
const config = require('config')
const { Pool } = require('pg')

const ws = require('ws')
const apiLayer = require('api')
const serviceLayer = require('service')
const repositoryLayer = require('repository')
const modelLayer = require('model')
const aop = require('aop')

const { port } = config.get('server')
const { port: wssPort } = config.get('wss')
const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env

const dbPool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
})

const server = new Hapi.Server()
server.connection({ port })

Promise.resolve()
  .then(() => modelLayer.init())
  .then(model => Promise.all([model, repositoryLayer.init(dbPool, model)]))
  .then(([model, repository]) => serviceLayer.init(repository, model))
  .then(service => apiLayer.init(server, service))
  .then(() => aop.init({ server }))
  .then(() => {
    server.start(err => {
      if (err) throw err
      server.log(`Server running at: ${server.info.uri}`)
    })
  })
  .catch(err => {
    server.log(err)
  })

const wss = new WebSocket.Server({ port: wssPort })
ws.init(wss)
