import { API_ROOT, API_TIMEOUT } from 'constants/host'
import axios from 'axios'

const request = ({
  method = 'get',
  endpoint,
  query = {},
  data = {},
  fullUrl = '',
  contentType = 'application/json',
}) => {
  const url = fullUrl || API_ROOT + endpoint
  const token = localStorage.getItem('accessToken')
  const headers = {
    'Content-Type': contentType,
  }

  if (token) {
    Object.assign(headers, { Authorization: `Bearer ${token}` })
  }

  return axios({
    method,
    url,
    params: query,
    data: data,
    timeout: API_TIMEOUT,
    headers: headers,
  })
}

const getToken = ({ userId, password }) => {
  return request({
    method: 'post',
    endpoint: '/token',
    data: JSON.stringify({
      user_id: userId,
      password,
    }),
  })
}

const getUserInfo = () => {
  const userId = localStorage.getItem('userId')
  return request({
    method: 'get',
    endpoint: `/users/${userId}`,
  })
}

const updateUserInfo = ({ userName, password }) => {
  const userId = localStorage.getItem('userId')
  return request({
    method: 'post',
    endpoint: `/users/${userId}`,
  })
}

const getUsers = () => {
  return request({
    method: 'get',
    endpoint: `/users`,
  })
}

const getAcquisitions = () => {
  return request({
    method: 'get',
    endpoint: `/acquisitions`,
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getToken,
  getUserInfo,
  updateUserInfo,
  getUsers,
  getAcquisitions,
}
