import React from 'react'
import classnames from 'classnames'
import Logo from './logo-sheets.png'
import Logo2 from './binange-logo.png'
import TableOutlined from '@ant-design/icons/TableOutlined'
import { Layout, Menu, Skeleton } from 'antd'

const MainMenu = ({ isLoading, handleSelect, tableData, collapsed }) => {
  console.log('tableData', tableData)
  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={classnames('logo', collapsed && 'logo_min')}>
        <div className='logo-wrap'>
          <img src={Logo} alt='' />
          <span>+</span>
          <img src={Logo2} alt='' />
        </div>
      </div>
      {isLoading ? (
        <div style={{ padding: 10 }}>
          <Skeleton.Button active size='small' block />
          <br />
          <br />
          <Skeleton.Button active size='small' block />
          <br />
          <br />
          <Skeleton.Button active size='small' block />
        </div>
      ) : (
        <Menu
          theme='dark'
          mode='inline'
          onSelect={(i) => handleSelect(i.key)}
          defaultSelectedKeys={['1']}
          items={tableData ? tableData.map((i) => ({
            key: i._id,
            icon: <TableOutlined />,
            label: i.title,
          })) : []}
        />
      )}
    </Layout.Sider>
  )
}

export default MainMenu
