let handlers = []

const local = 'wss://seashell-app-vvt9x.ondigitalocean.app'
// const local = 'ws://localhost:3000'

export function subscribe(event, handler) {
  if (!handlers[event]) {
    handlers[event] = []
  }

  handlers[event].push(handler)
}

export function unsubscribe(event, handler) {
  handlers[event] = handlers[event].filter((h) => h !== handler)
}

function publish(event, data) {
  if (!handlers[event] || handlers[event].length < 1) {
    return
  }

  handlers[event].forEach((handler) => {
    handler(data)
  })
}

export const connectToWebsocket = () => {
  let socket = new WebSocket(local)

  socket.onmessage = function (event) {
    let incoming = JSON.parse(event.data)
    publish(incoming.type, incoming.data)
  }
}
