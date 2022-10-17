const axios = require('axios')

const getP2PPrice = async ({
  tradeType = 'BUY',
  transAmount = 0,
  countries = [],
  payTypes = [],
  asset = 'USDT',
  fiat = 'RUB',
  amount = 0,
}) => {
  try {
    const postData = {
      asset,
      countries,
      payTypes,
      fiat,
      tradeType,
      transAmount,
      page: 1,
      rows: 10,
    }

    const response = await axios.request({
      url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
      method: 'post',
      data: postData,
    })

    return response.data
  } catch (e) {}
}

module.exports = {
  getP2PPrice,
}
