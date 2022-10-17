const state = new Map()

const schemaRegistration = (id, schema) => {
  state.set(id, [...Object.keys(schema), '_id'])
}

const getItem = (model, data) => {
  const dataObj = state.get(model).map(key => {
    if (key === '_id') {
        return { _id: data[key].toString() }
    }
    return {[key]: data[key]}
  })
  const values = Object.assign({}, ...dataObj)
  return values
}

const getItems = (model, data) => {
  return data.map(item => {
    return getItem(model, item)
  })
}

module.exports = {
  schemaRegistration,
  getItem,
  getItems,
}
