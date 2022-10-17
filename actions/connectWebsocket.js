const connectWebsocket = (wss) => {
  const clients = new Map()

  wss.on('connection', (ws, req) => {
    let clientId = req.url.slice(1)

    console.log('новое соединение ' + clientId)

    clients.set(clientId, ws)

    ws.on('close', function () {
      delete clients[clientId]
    })
  })

  return {
    notify: (message, id) => {
      const client = clients.get(id)

      if (client) {
        return client.send(message)
      }

      for (let value of clients.values()) {
        value.send(message)
      }
    },
  }
}

module.exports = connectWebsocket
