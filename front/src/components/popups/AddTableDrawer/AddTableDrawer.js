import { Button, Drawer, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import api from '../../../utils/api'

const AddTableDrawer = ({ isMobile, tableData, addTable, isOpen, handleToggle }) => {
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)
  const [isDisabled, setDisabled] = useState(false)

  const onFormChange = () => {
    setDisabled(false)
    form.setFields([{ name: 'id', errors: [] }])
  }

  const onFormSubmit = () => {
    const value = form.getFieldValue('id')
    if (!value) {
      setDisabled(true)
      form.setFields([{ name: 'id', errors: ['Введи правильный id-таблицы'] }])
      return
    }

    const already = tableData.find((i) => i.originalId === value)

    if (already) {
      setDisabled(true)
      form.setFields([{ name: 'id', errors: [`Таблица "${already.title}" уже добавлена`] }])
      return
    }

    setLoading(true)

    api
      .addTable({ id: value })
      .then((res) => {
        form.resetFields()
        addTable(res.data)
      })
      .catch((e) => {
        setDisabled(true)
        message.error('Неизвестная ошибка')
        if (e.data && e.data.error) {
          form.setFields([{ name: 'id', errors: [e.data.error] }])
          return
        }
        form.setFields([{ name: 'id', errors: ['неизвестная ошибка'] }])
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Drawer
      title='Введите id-таблицы'
      placement='right'
      width={isMobile ? '100%' : 450}
      onClose={handleToggle}
      open={isOpen}
      extra={<Button onClick={handleToggle}>Отмена</Button>}
    >
      <Form form={form} name='control-hooks' onChange={onFormChange} onSubmitCapture={onFormSubmit}>
        <Form.Item name='id'>
          <Input size={isMobile ? 'large': 'middle'} />
        </Form.Item>
        <Button htmlType='submit' disabled={isDisabled} type='primary' loading={isLoading}>
          Добавить
        </Button>
      </Form>
    </Drawer>
  )
}

export default AddTableDrawer
