import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
const { Header } = Layout

const MainHeader = ({ isMobile, isLoading, collapsed, handleToggleMenuCollapsed, handleToggleAddTableModal }) => {
  const handleReload = () => window.location.reload()
  return (
    <Header className='site-layout-background header-site'>
      <div className="header-site-left">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: handleToggleMenuCollapsed,
        })}
        <div className='header-site-title'>
          <div>
          <span>
          {'moneydashboard@moneydashboard.iam.gserviceaccount.com'}
        </span>
          </div>
        </div>
      </div>
      <div className="header-site-right">
        <Button
          disabled={isLoading}
          onClick={handleReload}
          type='default'
        >
          <ReloadOutlined />
        </Button>
      <Button
        disabled={isLoading}
        onClick={handleToggleAddTableModal}
        className='header-add-btn'
        type='primary'
      >
        <span className="text">
          {'Добавить таблицу'}
        </span>
        <span className="text_mobile">
          {'+'}
        </span>
      </Button>
      </div>
    </Header>
  )
}

export default MainHeader
