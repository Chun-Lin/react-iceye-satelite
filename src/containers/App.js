import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Login from 'components/Login'
import { selectUser, selectUsers, allUsers, logout } from 'redux/user/userRedux'
import Main from 'components/Main'
import api from 'api'

function App() {
  const dispatch = useDispatch()
  const [auth, setAuth] = useState(false)
  const users = useSelector(selectUsers)
  const user = useSelector(selectUser)

  useEffect(() => {
    const getUsersFunc = async () => {
      try {
        const res = await api.getUsers()
        dispatch(allUsers(res.data))
      } catch (err) {
        dispatch(logout())
      }
    }

    getUsersFunc()
  }, [dispatch])

  useEffect(() => {
    users.length > 0 || user ? setAuth(true) : setAuth(false)
  }, [users.length, user])

  return <div className="App">{auth ? <Main /> : <Login />}</div>
}

export default App
