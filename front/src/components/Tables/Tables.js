import React, { useEffect, useState, useMemo } from 'react'
import api from '../../utils/api'
import AddCellDrawer from '../popups/AddCellDrawer'
import { Button, Table, Empty, Spin, message } from 'antd'
import TableHeader from './components/TableHeader'
import { getColumns, getTableRenderData } from './config'
import { subscribe } from '../../utils/websocket'

const Tables = ({ isMobile, activeTableId, deleteTable, tableData }) => {
  const [isLoading, setLoading] = useState(true)
  const [cellList, setCellList] = useState([])
  const [isOpenAddCellModal, setOpenAddCellModal] = useState(false)
  const [editingValues, setEditingValues] = useState(null)

  const addCell = (res) => {
    setOpenAddCellModal(false)
    setCellList((cells) => [...cells, res])
  }

  const handleDeleteCell = (cellPosition, sheet) => {
    const deleteData = cellList.find((item) => {
      if (item.cellPosition === cellPosition && item.sheet === sheet) {
        return item
      }
    })

    api
      .deleteCell(deleteData._id)
      .then((res) => {
        const newData = cellList.filter((item) => item._id !== res.deleted)

        setCellList(newData)
        message.success(`Ячейка успешно удалена`)
      })
      .catch((_) => {
        message.error(`Что-то пошло не так`)
      })
  }

  const handleEditCell = (cellPosition, sheet) => {
    const cellData = cellList.find((item) => {
      if (item.cellPosition === cellPosition && item.sheet === sheet) {
        return item
      }
    })
    setEditingValues(cellData)
    setOpenAddCellModal(true)
  }

  console.log('cellList', cellList)

  const editCell = (cell) => {
    setCellList((list) => list.map((i) => (i._id === cell._id ? cell : i)))
  }

  useEffect(() => {
    subscribe('cell__change', editCell)

    setLoading(true)
    api
      .getCellsById(activeTableId)
      .then((res) => {
        setCellList(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [activeTableId])

  useEffect(() => {
    if (!isOpenAddCellModal) {
      setEditingValues(null)
    }
  }, [isOpenAddCellModal])

  const activeTable = tableData.find((i) => i._id === activeTableId)
  const columns = useMemo(() => getColumns({
    isMobile,
    cellList,
    handleEditCell,
    handleDeleteCell,
  }), [isMobile, cellList])
  const tableRenderData = useMemo(() => getTableRenderData(cellList), [cellList])

  if (!tableData.length || !activeTable) return <Empty />

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <AddCellDrawer
        tableData={tableData}
        activeTable={activeTable}
        handleCloseAddCellModal={() => setOpenAddCellModal(false)}
        isOpen={isOpenAddCellModal}
        editingValues={editingValues}
        addCell={addCell}
        editCell={editCell}
        cellList={cellList}
      />
      <TableHeader
        activeTable={activeTable}
        handleOpenAddCellModal={() => setOpenAddCellModal(true)}
        deleteTable={deleteTable}
      />
      {isLoading ? (
        <Spin size='large' className='centered-spinner' />
      ) : cellList.length ? (
        <div>
          <Table
            bordered
            columns={columns}
            dataSource={tableRenderData}
            size='small'
            pagination={false}
            scroll={{ x: 800 }}
          />
        </div>
      ) : (
        <Empty description={<span>Нет ни одной ячейки</span>}>
          <Button onClick={() => setOpenAddCellModal(true)} type='primary'>
            Добавить
          </Button>
        </Empty>
      )}
    </div>
  )
}

export default Tables
