const { getP2PPrice } = require('./binance')
const CellModel = require('./models/Cell')
const googleSheets = require('./googleSheets')
const { setItem: setCachedItem } = require('./p2pResponseCache')
const websocket = require('./index')
const { getItem } = require('./actions/schemaRegistration')

const flashTimeout = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const parser = async () => {
  try {
    const data = await CellModel.find({})

    if (!data.length) {
      return
    }

    for (const item of data) {
      await flashTimeout(21000)


      const data = await getItem('Cell', item)

      const response = await getP2PPrice({
        asset: data.asset,
        countries: data.countries,
        payTypes: data.payTypes,
        fiat: data.fiat,
        tradeType: data.tradeType,
        transAmount: data.transAmount,
      })

      if (response && response.data && response.data[0] && response.data[0].adv) {
        const { updateCell } = await googleSheets(data.originalId)

        const price = response.data[0].adv.price

        await setCachedItem(data._id, response.data)

        if (price) {
          await flashTimeout(21000)
          console.log('нотификашка: cell__change')
          await updateCell(data.sheet, data.cellPosition, Number(price))
          websocket.websocket.notify(
            JSON.stringify({
              type: 'cell__change',
              data: { ...data, adv: response.data },
            })
          )
        }
      }
    }

    parser()
  } catch (e) {
    console.log('parsser error: ', e)
    setTimeout(parser, 500000)
  }
}

module.exports = parser
