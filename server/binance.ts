import axios from "axios";

interface IGetP2PPrice {
  type: string,
  payTypes?: string[],
  asset: string,
  fiat: string,
  amount: number,
}

export const getP2PPrice = async ({
 type = 'BUY',
 payTypes,
 asset = 'USDT',
 fiat = 'RUB',
 amount = 0,
}: IGetP2PPrice) => {
  try {
    const postData = {
      asset,
      countries: [],
      fiat,
      page: 1,
      proMerchantAds: false,
      publisherType: null,
      rows: 10,
      tradeType: type,
      transAmount: amount
    }

    if (payTypes) {
      postData['payTypes'] = payTypes
    }

    const { data } = await axios.request({
      url: 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
      method: 'post',
      data: postData,
    })

    return data
  } catch (e) {}
}
