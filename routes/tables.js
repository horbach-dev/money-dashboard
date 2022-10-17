const { Router } = require('express')
const TableModel = require('../models/Table')
const CellModel = require('../models/Cell')
const googleSheets = require('../googleSheets')
const mobile = require('is-mobile')
const { getItems } = require('../actions/schemaRegistration')
const router = Router()

router.get('/all-tables', async (req, res) => {
  const tables = await TableModel.find({})
  const items = getItems('Table', tables)
  const isMobile = mobile({ ua: req })
  await res.json({ data: { items, isMobile } })
})

router.post('/add-table', async (req, res) => {
  try {
    const { title, url, sheets } = await googleSheets(req.body.id)

    if (!title) {
      res.status(422).json({ data: { error: 'таблицы не найдено' } })
      return
    }

    const item = await TableModel.find({ originalId: req.body.id })

    if (!item.length) {
      const table = new TableModel({
        title,
        url,
        sheets,
        originalId: req.body.id,
      })
      await table.save()
      res.status(201).json({ data: table })
      return
    }

    res.status(422).json({ data: { error: `Возможно эта таблица уже добавлена` } })
  } catch (e) {
    res.status(500).json({ data: { error: 'Что-то пошло не так :(' } })
    console.log('/add-table error:', e.message)
  }
})

router.delete('/remove-table', async (req, res) => {
  try {
    await CellModel.deleteMany({ ownerTableId: req.body.id })
    await TableModel.deleteOne({ _id: req.body.id })

    const countDocuments = await TableModel.countDocuments({
      _id: req.body.id,
    })
    const countCells = await CellModel.find({ ownerTableId: req.body.id })

    if (countDocuments && !countCells.length) {
      res.status(201).json({ data: { deleted: req.body.id } })
      return
    }

    res.status(201).json({ data: { deleted: req.body.id } })
  } catch (e) {
    res.status(500).json({ message: 'Something wend wrong!' })
  }
})

module.exports = router
