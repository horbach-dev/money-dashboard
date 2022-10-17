const { google } = require('googleapis')

const googleSheets = async (id) => {
  async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './config/moneydashboard-creds.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    })

    const client = await auth.getClient()

    const googleSheets = google.sheets({
      version: 'v4',
      auth: client,
    })

    return {
      auth,
      client,
      googleSheets,
      spreadsheetId: id,
    }
  }

  const { googleSheets, auth, spreadsheetId } = await getAuthSheets()

  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  })

  return {
    title: metadata.data.properties.title,
    sheets: [...metadata.data.sheets.map((i) => i.properties.title)],
    url: metadata.data.spreadsheetUrl,
    updateCell: async (page, position, value) => {
      await googleSheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${page}!${position}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: { values: [value] },
        },
      })
    },
  }
}

module.exports = googleSheets
