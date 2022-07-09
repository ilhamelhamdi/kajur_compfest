import { API_IMAGE_SERVER_AUTHORIZATION } from "../config"

const uploadImg = async (url, data) => {
  const formData = new FormData()
  formData.append('image', data)

  const requestOptions = {
    method: 'POST',
    referrerPolicy: "no-referrer",
    headers: {
      'Authorization': API_IMAGE_SERVER_AUTHORIZATION
    },
    body: formData
  }
  const res = (await fetch(url, requestOptions)).json()
  return res
}

const deleteImg = async (url) => {
  const requestOptions = {
    method: 'DELETE',
    referrerPolicy: "no-referrer",
    headers: {
      'Authorization': API_IMAGE_SERVER_AUTHORIZATION
    },
  }
  const res = (await fetch(url, requestOptions)).json()
  return res
}

export default { uploadImg, deleteImg }