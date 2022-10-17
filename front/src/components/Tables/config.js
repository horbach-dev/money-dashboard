import { Popconfirm, Popover, Button, Tag } from 'antd'
import { DeleteOutlined, FormOutlined, AppstoreOutlined, SwapOutlined } from '@ant-design/icons'
import React from 'react'

export const getColumns = ({ isMobile, cellList, handleEditCell, handleDeleteCell }) => {
  const list = [
    {
      title: 'Вкладка',
      dataIndex: 'sheet',
      width: 120,
      align: 'center',
      fixed: isMobile ? null : 'left',
    },
    {
      title: 'Ячейка',
      dataIndex: 'cellPosition',
      width: 80,
      align: 'center',
      fixed: isMobile ? null : 'left',
    },
    {
      title: 'Тип сделки',
      dataIndex: 'tradeType',
      align: 'center',
      width: 100,
      render: (_, record) => <Tag color={record.tradeType === 'Покупка' ? 'green' : 'red'}>{record.tradeType}</Tag>,
    },
    {
      title: 'Актив',
      dataIndex: 'asset',
      width: 100,
    },
    {
      title: 'Фиат',
      dataIndex: 'fiat',
      width: 100,
    },
    {
      title: 'Сумма',
      dataIndex: 'transAmount',
      width: 180,
    },
    {
      title: 'Способ оплаты',
      dataIndex: 'payTypes',
      width: 180,
    },
    {
      title: 'Регион',
      dataIndex: 'countries',
      width: 180,
    },
  ]

  console.log('isMobile', isMobile)

  const actions = {
    title: isMobile ? <AppstoreOutlined /> : 'Действие',
    key: 'operation',
    fixed: 'right',
    width: isMobile ? 50 : 100,
    align: 'center',
    render: (_, record) => {
      return cellList.length >= 1 ? (
        <div>
          <FormOutlined
            onClick={() => handleEditCell(record.cellPosition, record.sheet)}
            style={{ marginRight: '20px' }}
          />
          <Popconfirm
            placement='topLeft'
            title='Удалить ячейку?'
            cancelText='Отмена'
            okText='Ok'
            onConfirm={() => handleDeleteCell(record.cellPosition, record.sheet)}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ) : null
    },
  }

  const adv = {
    title: 'Adv',
    dataIndex: 'adv',
    fixed: isMobile ? null : 'right',
    width: 100,
    align: 'center',
    render: (_, record) => {
      const count = record.adv.length
      return (
        <Popover
          placement='topLeft'
          className='cell-adv-popover'
          title={'Активные объявления'}
          content={
            count ? (
              record.adv.map((item) => {
                const done =
                  item && item.advertiser && item.advertiser.monthFinishRate
                    ? String(item.advertiser.monthFinishRate * 100).substring(0, 4)
                    : null

                const order =
                  item && item.advertiser && item.advertiser.monthOrderCount
                    ? item.advertiser.monthOrderCount
                    : null

                return (
                  <div className='cell-adv-popover-list' key={item.adv.advNo}>
                    <p>
                      Цена: {item.adv.price} {item.adv.fiatUnit}
                    </p>
                    {order ? <p>Ордеров: {item.advertiser.monthOrderCount}</p> : null}
                    {done ? <p>Выполнено: {item.advertiser.monthFinishRate * 100}%</p> : null}
                  </div>
                )
              })
            ) : (
              <p>
                Нет объявлений <br /> (задержка в пару минут)
              </p>
            )
          }
          trigger='click'
        >
          <Button type='primary' size='small' style={{ fontSize: 12 }}>
            <SwapOutlined style={{ marginRight: 16 }} />
            {count}
          </Button>
        </Popover>
      )
    },
  }

  if (isMobile) {
    list.push(adv)
    list.push(actions)
  } else {
    list.push(actions)
    list.push(adv)
  }

  return list
}

export const getTableRenderData = (cellList) =>
  cellList.map((i) => ({
    key: i.cellPosition,
    cellPosition: i.cellPosition,
    sheet: i.sheet,
    tradeType: i.tradeType === 'BUY' ? 'Покупка' : 'Продажа',
    asset: i.asset || '-',
    fiat: i.fiat,
    transAmount: i.transAmount || '-',
    payTypes: i.payTypes?.length ? i.payTypes : '-',
    countries: i.countries && i.countries?.length ? i.countries : '-',
    adv: i.adv && i.adv.length ? i.adv : [],
  }))
