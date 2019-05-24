import axios from 'axios'
const baseUrl = '/api/images'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const getOne = async id => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  }

export default { getAll, getOne }