import { Button, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import AddCellDrawerForm from './components/AddCellDrawerForm'
import api from '../../../utils/api'

const AddCellDrawer = ({
  editingValues,
  editCell,
  activeTable,
  addCell,
  isOpen,
  handleCloseAddCellModal,
  cellList,
}) => {
  const [fiatList, setFiatList] = useState([])

  useEffect(() => {
    api.getFiatList().then(({ data }) => {
      setFiatList(data)
    })
  }, [])

  return (
    <Drawer
      title='Введите данные для обработки ячейки'
      placement='top'
      height='auto'
      onClose={handleCloseAddCellModal}
      open={isOpen}
      extra={<Button onClick={handleCloseAddCellModal}>Отмена</Button>}
    >
      <AddCellDrawerForm
        addCell={addCell}
        editCell={editCell}
        activeTable={activeTable}
        editingValues={editingValues}
        fiatList={fiatList}
        cellList={cellList}
      />
    </Drawer>
  )
}

export default AddCellDrawer
