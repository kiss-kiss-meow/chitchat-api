const WebSocket = require('ws')

const init = wss => {
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
}

module.exports = {
  init,
}
