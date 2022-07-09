const get = async (url, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {}
  }
  if (token) requestOptions.headers.Authorization = `JWT ${token}`
  const res = await fetch(url, requestOptions)
  return res.json()
}

const post = async (url, requestBody, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }
  if (token) requestOptions.headers.Authorization = `JWT ${token}`

  const res = await fetch(url, requestOptions)
  return res.json()
}

const put = async (url, requestBody, token) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    },
    body: JSON.stringify(requestBody)
  }
  const res = await fetch(url, requestOptions)
  return res.json()
}

const del = async (url, token) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Authorization': `JWT ${token}`
    }
  }
  const res = await fetch(url, requestOptions)
  return res.json()
}

const APIUtils = { get, post, put, del }

export default APIUtils