import axios from 'axios'

export default axios.create({
  baseURL: `https://happening-api.now.sh/`,
  headers: {
    'Content-Type': 'application/json'
  }
})
