const { Router } = require('express')
const CellModel = require('../models/Cell')
const { getItem: getCachedItem } = require('../p2pResponseCache')
const { getItem } = require('../actions/schemaRegistration')
const router = Router()

router.post('/all-cells', async (req, res) => {
  try {
    const cells = await CellModel.find({ ownerTableId: req.body.id })

    if (!cells.length) {
      await res.status(200).json({ data: [] })
      return
    }

    const returnCells = []

    for (const item of cells) {
      const cache = getCachedItem(item._id)
      const data = await getItem('Cell', item)

      if (cache) {
        returnCells.push({ ...data, adv: cache })
      } else {
        returnCells.push({ ...data, adv: [] })
      }
    }

    await res.status(200).json({ data: returnCells })
  } catch (e) {
    console.log('/all-cells error: ', e.message)
    res.status(500)
  }
})

router.post('/add-cell', async (req, res) => {
  try {
    const params = {
      sheet: req.body.sheet,
      originalId: req.body.originalId,
      cellPosition: req.body.cellPosition,
      tradeType: req.body.tradeType,
      asset: req.body.asset,
      fiat: req.body.fiat,
      transAmount: req.body.transAmount,
      payTypes: [],
      countries: [],
      ownerTableId: req.body.ownerTableId,
      url: req.body.url,
    }

    if (req.body.payTypes && req.body.payTypes.length) {
      params.payTypes = [req.body.payTypes]
    }

    if (req.body.countries && req.body.payTypes.length) {
      params.countries = [req.body.countries]
    }

    const item = await CellModel.find({
      sheet: params.sheet,
      cellPosition: params.cellPosition,
      ownerTableId: params.ownerTableId,
    })

    if (!item.length) {
      const cellObj = new CellModel(params)

      await cellObj.save()

      const data = await getItem('Cell', cellObj)
      const cache = getCachedItem(data._id)

      if (!cache) {
        res.status(201).json({ data: { ...data, adv: [] } })
        return
      }

      res.status(201).json({ data: { ...data, adv: cache } })
      return
    }

    res.status(422).json({
      data: {
        error: `Ячейка "${params.cellPosition}" в этой таблице на странице "${params.sheet}"`,
      },
    })
  } catch (e) {
    res.status(500)
  }
})

router.post('/edit-cell', async (req, res) => {
  try {
    const params = {
      cellPosition: req.body.cellPosition,
      tradeType: req.body.tradeType,
      asset: req.body.asset,
      transAmount: req.body.transAmount,
      fiat: req.body.fiat,
      sheet: req.body.sheet,
      payTypes: [],
      countries: [],
    }

    if (req.body.payTypes && req.body.payTypes.length) {
      params.payTypes = [req.body.payTypes]
    }

    if (req.body.countries && req.body.countries.length) {
      params.countries = [req.body.countries]
    }

    await CellModel.updateOne({ _id: req.body.id }, { $set: params })

    const cellObj = await CellModel.findOne({ _id: req.body.id })
    const cache = getCachedItem(req.body.id)

    const data = await getItem('Cell', cellObj)

    if (cache) {
      res.status(201).json({ data: { ...data, adv: cache } })
      return
    }

    res.status(201).json({ data: { ...data, adv: [] } })
  } catch (e) {
    res.status(500)
  }
})

router.delete('/remove-cell', async (req, res) => {
  try {
    await CellModel.deleteOne({ _id: req.body.id }, (err, results) => {
      res.status(201).json({ deleted: req.body.id })
    })
  } catch (e) {
    res.status(500)
  }
})

module.exports = router
