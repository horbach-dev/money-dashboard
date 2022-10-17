let WSServer = require('ws').Server
let server = require('http').createServer()
const path = require('path')
let app = require('./server')
let parser = require('./parser')
const database = require('./database')
const connectWebsocket = require('./actions/connectWebsocket')

const PORT = process.env.PORT || 3000

server.on('request', app)

// app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/index.html'))
// })

async function start() {
  try {
    await database()

    let wss = new WSServer({
      server: server,
    })

    server.listen(PORT, function () {
      console.log(`http/ws server listening on ${PORT}`)
      parser()
      exports.websocket = connectWebsocket(wss)
    })
  } catch (e) {
    console.log('error index:', e)
  }
}

return start()
