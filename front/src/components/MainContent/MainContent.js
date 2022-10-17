import React from 'react'
import { Button, Empty, Spin } from 'antd'
import Tables from '../Tables'

const MainContent = ({ isMobile, isLoading, tableData, deleteTable, activeTableId, handleToggleAddTableModal }) => {
  if (isLoading) {
    return <Spin size='large' className='centered-spinner' />
  }

  console.log('tableData', tableData)

  if (!tableData && !tableData.length) {
    return (
      <Empty description={<span>{'Нет таблиц'}</span>}>
        <Button onClick={handleToggleAddTableModal} type='primary'>
          {'Добавить'}
        </Button>
      </Empty>
    )
  }

  if (!activeTableId) {
    return <Empty description={<span>{'Выберите таблицу в боковом меню'}</span>} />
  }

  return <Tables isMobile={isMobile} tableData={tableData} activeTableId={activeTableId} deleteTable={deleteTable} />
}

export default MainContent
