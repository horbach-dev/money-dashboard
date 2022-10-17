import axios from 'axios'

const local = 'https://seashell-app-vvt9x.ondigitalocean.app'
// let local = 'http://localhost:3000/'

const client = axios.create({
  baseURL: local,
});

export function setToken(token) {
  if (!token) {
    return;
  }

  client.defaults.headers.common["Authorization"] = token
    ? "Bearer " + token
    : null;
}

const request = async (endpoint, options = {}) => {
    return client(endpoint, options).then(response => {
      return response.data
    }).catch(error => {
      if (!error.response || !error.response.data) {
        throw new Error('unknow_error')
      }

      if (error.response.data && error.response.data.data) {
        if (error.response.data.data.error === 'unauthorized') {
          throw new Error(error.response.data.data.error)
        }
      }

      throw new Error('unknow_error')
    })
}

const api = {
  loginUser: (data) =>
    request('/login-user', {
      method: 'post',
      data,
    }),
  getUserData: (userId) => {
    return request({
      url: `/user/${userId}`,
      method: 'get',
    })
  },
  getTables: () =>
    request('/all-tables', {
      method: 'get',
    }),
  addTable: (data) =>
    request('/add-table',{
      method: 'post',
      data,
    }),
  removeTable: (id) =>
    request('/remove-table',{
      method: 'delete',
      data: { id },
    }),
  editTable: (data) =>
    request('/edit-table', {
      method: 'post',
      data,
    }),
  getCellsById: (id) =>
    request('/all-cells', {
      method: 'post',
      data: { id },
    }),
  addCell: (data) =>
    request('/add-cell', {
      method: 'post',
      data,
    }),
  editCell: (data) =>
    request('/edit-cell', {
      method: 'post',
      data,
    }),
  deleteCell: (id) =>
    request('/remove-cell', {
      method: 'delete',
      data: { id },
    }),
  getFiatList: () =>
    request('https://p2p.binance.com/bapi/c2c/v1/public/c2c/trade-rule/fiat-list', {
      method: 'post',
    }),
  getPaymentMethods: (fiat) =>
    request('https://p2p.binance.com/bapi/c2c/v2/public/c2c/adv/filter-conditions', {
      method: 'post',
      data: { fiat },
    }),
}

export default api
