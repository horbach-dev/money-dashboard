import './App.css'
import React, { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'


import FAQ from './components/pages/FAQ'
import Login from './components/pages/Login'
import AppLayout from './AppLayout'
import api, { setToken } from './utils/api';
import { Modal, Spin } from 'antd';
import { connectToWebsocket } from './utils/websocket';

function App() {
  const [userData, setUserData] = useState({ isGuest: true, isMobile: true })
  const [isGlobalLoading, setGlobalLoading] = useState(false)

  const bootstrapApp = (id) => {
    connectToWebsocket(id)

    if (!localStorage.getItem('it_was')) {
      Modal.info({
        title: 'Важно',
        content: (
          <div>
            <p>необходимо пригласить в каждую таблицу, в которой требуются корректировки бота по этому email:</p>
            <p>{'moneydashboard@moneydashboard.iam.gserviceaccount.com'}</p>
          </div>
        ),
        onOk() {
          localStorage.setItem('it_was', "true")
        },
      });
    }
  }

  useEffect(() => {
    bootstrapApp()
    // setGlobalLoading(true)
    // const userId = localStorage.getItem('user_id') || 1
    // api.getUserData(userId).then(res => {
    //   setToken(res.data.token)
    //
    //   setUserData({ ...res.data.user, isGuest: false })
    //
    //   bootstrapApp(res.data.user._id)
    //
    // }).catch(error => {
    //   if (error.message === 'unauthorized') {
    //     setUserData(data => ({ ...data, isGuest: true, isMobile: true }))
    //   }
    // }).finally(() => {
    //   setGlobalLoading(false)
    // })
  }, [])

  let routes = useRoutes([
    { path: "/", element: <AppLayout userData={userData} setUserData={setUserData} /> },
    { path: "login", element: <Login userData={userData} setUserData={setUserData} /> },
    { path: "faq", element: <FAQ /> },
    // ...
  ])


  if (isGlobalLoading) return <Spin size="large" className='centered-spinner' />

  return routes
}

export default App
