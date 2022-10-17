import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import api, {setToken} from '../utils/api';

const useInitApp = ({ setUserData, bootstrapApp, setGlobalLoading }) => {
  const history = useNavigate()
  // const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('user_id') || 1
    api.getUserData(userId).then(res => {
      setToken(res.data.token)
      setUserData({ ...res.data.user, isGuest: false })
      bootstrapApp(res.data.user._id)
    }).catch(error => {
      if (error === 'unauthorized') {
        history('/login')
        setUserData(data => ({ ...data, isGuest: true }))
      }
    }).finally(() => {
      setGlobalLoading(false)
    })
  }, [])

  return null
}

export default useInitApp
