import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Login from 'components/Login'
import { selectUser, fetchUsers, selectUsers } from 'redux/user/userRedux'
import Main from 'components/Main'

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

  return <div className="App">{auth ? <Main /> : <Login />}</div>
}

export default App
