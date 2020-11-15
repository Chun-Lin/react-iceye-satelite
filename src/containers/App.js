import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Login from 'containers/Login'
import {
  selectUser,
  fetchUserInfo,
  fetchUsers,
  selectUsers,
} from 'redux/user/userRedux'
import api from 'api'

function App() {
  const dispatch = useDispatch()
  const [auth, setAuth] = useState(false)
  const users = useSelector(selectUsers)
  const user = useSelector(selectUser)

  useEffect(() => {
    const confirmAuth = async () => {
      dispatch(fetchUsers())
    }

    confirmAuth()
  }, [dispatch])

  useEffect(() => {
    users.length > 0 || user ? setAuth(true) : setAuth(false)
  }, [users.length, user])

  return <div className="App">{auth ? <div>Main Page</div> : <Login />}</div>
}

export default App
