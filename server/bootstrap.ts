import { GoogleSpreadsheet } from 'google-spreadsheet'
import moneyDashboardCreds from './moneydashboard-creds.json'
import { getP2PPrice } from "./binance";

const tableId = '17qfGGGHeZ4WgCu6kMvf-cqFCM3vWqWI7aM4D6d3myjc'

async function bootstrap () {
  const { data } = await getP2PPrice({
    type: 'BUY',
    asset: 'USDT',
    fiat: 'RUB',
    payTypes: ['TinkoffNew'],
    amount: 100000,
  })

  const { data: data2 } = await getP2PPrice({
    type: 'BUY',
    asset: 'USDT',
    fiat: 'IDR',
    amount: 10000000,
  })
  const priceRUB = data?.[0]?.adv?.price
  const priceIDR = data2?.[0]?.adv?.price

  try {
    const spreadsheetInstance = new GoogleSpreadsheet(tableId)

    await spreadsheetInstance.useServiceAccountAuth(moneyDashboardCreds)

    await spreadsheetInstance.loadInfo()
    const sheet = await spreadsheetInstance.sheetsByIndex[0]

    // select cells scope
    await sheet.loadCells('A1:E20');

    // get RUB cell
    const cellRUB = sheet.getCellByA1('A6');
    const cellIDR = sheet.getCellByA1('D6');

    cellRUB.value = priceRUB && Number(priceRUB) || 'none'
    cellIDR.value = priceIDR && Number(priceIDR) || 'none'
    await sheet.saveUpdatedCells();

  } catch (e) {
    console.log('error', e)
  }
}

export default bootstrap
