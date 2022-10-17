import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useNavigate } from "react-router-dom"
import api from './utils/api'

import MainMenu from './components/Menu'
import AddTableDrawer from './components/popups/AddTableDrawer'
import Header from './components/Header'
import MainContent from './components/MainContent'

import { Layout, message, Modal } from 'antd'
const { Content } = Layout

const AppLayout = ({ userData, setUserData }) => {
  const navigate = useNavigate()
  const [isOpenAddTableModal, setOpenAddTableModal] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [activeTableId, setActiveTableId] = useState('')

  const handleToggleAddTableModal = () => setOpenAddTableModal((v) => !v)

  const handleToggleMenuCollapsed = () => setCollapsed((v) => !v)

  const addTable = (table) => {
    handleToggleAddTableModal()
    setTableData((data) => [...data, table])
    return message.success(`Таблица "${table.title}" добавлена`)
  }

  const deleteTable = (id) => {
    setLoading(true)
    api
      .removeTable(id)
      .then(() => {
        setTimeout(() => setTableData((data) => [...data.filter((i) => i._id !== id)]), 500)
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500)
      })
  }

  useEffect(() => {
    // if (!userData.isGuest) {
      setLoading(true)

      api.getTables(userData._id)
        .then(({ data }) => {
          setTableData(data.items)
          setUserData(d => ({ ...d, isMobile: data.isMobile }))
        })
        .finally(() => setLoading(false))
    // } else {
    //   navigate('/login')
    // }
  }, [userData.isGuest])

  const isMobile = userData.isMobile

  // useEffect(() => {
  //   isMobile && setCollapsed(true)
  // }, [isMobile, userData.isGuest])


  // if (userData.isGuest) {
  //   return <div>Редирект...</div>
  // }

  return <Layout className={classnames('main-layout', collapsed && 'collapsed-layout')}>
    <MainMenu
      isLoading={isLoading}
      handleSelect={setActiveTableId}
      tableData={tableData}
      collapsed={collapsed}
    />
    <AddTableDrawer
      tableData={tableData}
      handleToggle={handleToggleAddTableModal}
      isOpen={isOpenAddTableModal}
      addTable={addTable}
      isMobile={isMobile}
    />
    <Layout className='site-layout'>
      <Header
        isMobile={isMobile}
        isLoading={isLoading}
        collapsed={collapsed}
        handleToggleAddTableModal={handleToggleAddTableModal}
        handleToggleMenuCollapsed={handleToggleMenuCollapsed}
      />
      <Content className='site-layout-background content-site'>
        <MainContent
          isMobile={isMobile}
          isLoading={isLoading}
          tableData={tableData}
          activeTableId={activeTableId}
          deleteTable={deleteTable}
          handleToggleAddTableModal={handleToggleAddTableModal}
        />
      </Content>
    </Layout>
  </Layout>
}

export default AppLayout
