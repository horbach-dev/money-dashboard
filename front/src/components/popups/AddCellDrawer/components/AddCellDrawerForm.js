import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, message, Select } from 'antd'
import api from '../../../../utils/api'

const AddCellDrawerForm = ({ activeTable, editingValues, cellList, editCell, fiatList, addCell }) => {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)
  const [isDisabled, setDisabled] = useState(false)
  const [fiatValue, setFiatValue] = useState('')
  const [availableCountries, setAvailableCountries] = useState([])
  const [availablePayTypes, setAvailablePayTypes] = useState([])

  useEffect(() => {
    if (editingValues) {
      form.setFieldsValue({
        sheet: editingValues.sheet,
        cellPosition: editingValues.cellPosition,
        tradeType: editingValues.tradeType,
        asset: editingValues.asset,
        fiat: editingValues.fiat,
        transAmount: editingValues.transAmount,
        payTypes: editingValues.payTypes,
        countries: editingValues.countries,
      })

      editingValues.fiat && handleChangeFiat(editingValues.fiat)
    } else {
      form.resetFields()
    }
  }, [form, editingValues])

  const onFormSubmit = (values) => {

    const submitValues = {
      ownerTableId: activeTable._id,
      originalId: activeTable.originalId,
      url: activeTable.url,
    }

    if (values.cellPosition) {
      submitValues.cellPosition = values.cellPosition.toUpperCase()
    }

    if (!values.countries || values.countries === 'all') {
      submitValues.countries = null
    }  else {
      submitValues.countries = values.countries
    }

    if (!values.payTypes || values.payTypes === 'all') {
      submitValues.payTypes = null
    } else {
      submitValues.payTypes = values.payTypes
    }

    const val = Object.keys(values).filter((i) => values[i])
    val.forEach((key) => (submitValues[key] = values[key]))

    if (submitValues.transAmount) {
      submitValues.transAmount = String(submitValues.transAmount)
    }

    setLoading(true)

    if (editingValues) {
      submitValues.id = editingValues._id

      if (!editingValues.countries || editingValues.countries === 'all') {
        submitValues.countries = null
      }

      if (editingValues.countries && editingValues.countries.length) {
        submitValues.countries = values.countries
      }

      if (!editingValues.payTypes || editingValues.payTypes === 'all') {
        submitValues.payTypes = null
      }

      if (editingValues.payTypes && editingValues.payTypes.length) {
        submitValues.payTypes = values.payTypes
      }

      const isInclude = cellList.filter((i) => i.cellPosition === submitValues.cellPosition)
      if (isInclude && isInclude.length > 1) {
        message.error(`Ячейка "${submitValues.cellPosition}" уже добавлена`)
        return
      }

      api
        .editCell(submitValues)
        .then((res) => {
          editCell(res.data)
          form.resetFields()
          message.success('Ячейка успешно изменена')
        })
        .catch((e) => {
          setDisabled(true)
          if (e.data && e.data.error) {
            message.error(e.data.error)
            return
          }
          message.error('Неизвестная ошибка')
        })
        .finally(() => {
          setLoading(false)
        })

      return
    }

    api
      .addCell(submitValues)
      .then((res) => {
        addCell(res.data)
        message.success('Ячейка успешно добавлена')
        form.resetFields()
      })
      .catch((e) => {
        setDisabled(true)
        if (e.data && e.data.error) {
          message.error(e.data.error)
          return
        }
        message.error('Неизвестная ошибка')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChangeFiat = (fiat) => {
    if (!fiat) return
    setFiatValue(fiat)
    api.getPaymentMethods(fiat).then((res) => {
      setAvailablePayTypes(res.data.tradeMethods)
      setAvailableCountries(res.data.countries)
    })
  }

  return (
    <Form
      form={form}
      name='control-hooks'
      className='add-cell-drawer'
      onFieldsChange={() => setDisabled(false)}
      onFinish={onFormSubmit}
    >
      <Form.Item name='sheet' rules={[{ required: true, message: 'Заполни' }]}>
        <Select showSearch placeholder='Вкладка' listHeight={200} style={{ width: 110 }}>
          {activeTable.sheets.map((i) => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name='cellPosition' rules={[{ required: true, message: 'Заполни' }]}>
        <Input placeholder='Ячейка' style={{ width: 75, textTransform: 'uppercase' }} />
      </Form.Item>

      <Form.Item name='tradeType' rules={[{ required: true, message: 'Заполни' }]}>
        <Select placeholder='Тип' style={{ width: 105 }}>
          <Select.Option value='BUY'>Покупка</Select.Option>
          <Select.Option value='SELL'>Продажа</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name='asset' rules={[{ required: true, message: 'Заполни' }]}>
        <Select placeholder='Актив' style={{ width: 100 }}>
          <Select.Option value='USDT'>USDT</Select.Option>
          <Select.Option value='BUSD'>BUSD</Select.Option>
          <Select.Option value='BTC'>BTC</Select.Option>
          <Select.Option value='BNB'>BNB</Select.Option>
          <Select.Option value='ETH'>ETH</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name='fiat' rules={[{ required: true, message: 'Заполни' }]}>
        <Select showSearch placeholder='Фиат' listHeight={200} style={{ width: 100 }} onChange={handleChangeFiat}>
          {fiatList.map((i) => (
            <Select.Option key={i.currencyCode} value={i.currencyCode}>
              {i.currencyCode}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name='transAmount'>
        <InputNumber addonAfter={fiatValue} placeholder='Сумма' style={{ width: 180 }} />
      </Form.Item>

      <Form.Item name='payTypes'>
        <Select
          showSearch
          listHeight={200}
          style={{ width: 180 }}
          allowClear
          placeholder='Способы оплаты'
          defaultActiveFirstOption
        >
          <Select.Option value={'all'}>Все способы</Select.Option>
          {availablePayTypes.length &&
            availablePayTypes.map((i) => (
              <Select.Option key={i.identifier} value={i.identifier}>
                <span className='bank-indicator' style={{ background: i.tradeMethodBgColor }} />
                {i.tradeMethodName}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item name='countries'>
        <Select
          allowClear
          showSearch
          listHeight={200}
          style={{ width: 180 }}
          placeholder='Доступные регионы'
          defaultActiveFirstOption
        >
          <Select.Option value={'all'}>Все регионы</Select.Option>
          {availableCountries.length &&
            availableCountries.map((i) => (
              <Select.Option key={i.scode} value={i.scode}>
                {i.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <Button htmlType='submit' type='primary' disabled={isDisabled} loading={isLoading}>
        {editingValues ? 'Именить' : 'Добавить'}
      </Button>
    </Form>
  )
}

export default AddCellDrawerForm
