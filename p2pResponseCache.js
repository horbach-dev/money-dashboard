const state = new Map()

const getItem = (id) => {
  return state.get(id)
}

const setItem = (id, obj) => {
  return state.set(id, obj)
}


module.exports = {
  getItem,
  setItem,
}

