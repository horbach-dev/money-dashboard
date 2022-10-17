import React from 'react'
import GoogleOutlined from '@ant-design/icons/GoogleOutlined'
import ReloadOutlined from '@ant-design/icons/ReloadOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { Button, Popconfirm, Popover } from 'antd'

const TableHeader = ({ activeTable, handleOpenAddCellModal, deleteTable }) => {
  return (
    <div className='table-header'>
      <h3>{activeTable.title}</h3>
      <a
        className='ant-btn ant-btn-as-link ant-btn-dashed ant-btn-block'
        href={activeTable.url}
        target='_blank'
        rel='noreferrer'
        style={{ fontSize: 12, marginRight: 10 }}
      >
        <span className="text">
          {'В таблицу'}
        </span>
        <GoogleOutlined />
      </a>
      <Button
        onClick={handleOpenAddCellModal}
        size='small'
        style={{ fontSize: 12, marginRight: 10 }}
        type='primary'
      >
        <span className="text">
        {'Добавить ячейку'}
        </span>
        <PlusOutlined />
      </Button>
      <Popconfirm
        placement='bottomLeft'
        title='Удалить текущую таблицу?'
        cancelText='Отмена'
        okText='Ok'
        onConfirm={() => deleteTable(activeTable._id)}
      >
        <Button danger size='small' style={{ fontSize: 12 }}>
          <span className="text">
          {'Удалить таблицу'}
          </span>
          <DeleteOutlined/>
        </Button>
      </Popconfirm>

      {/*<Popover placement='bottomLeft' content={<div><p>Будет доступно </p><p>в ближайшем обновлении</p></div>}>*/}
      {/*  <Button*/}
      {/*    // disabled={isLoading}*/}
      {/*    // onClick={handleToggleAddTableModal}*/}
      {/*    className='table-header-reload'*/}
      {/*    size='small'*/}
      {/*    type="default"*/}
      {/*  >*/}
      {/*    <ReloadOutlined />*/}
      {/*  </Button>*/}
      {/*</Popover>*/}
    </div>
  )
}

export default TableHeader
