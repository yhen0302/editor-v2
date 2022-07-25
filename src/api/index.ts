import axios from 'axios'
const baseURL = 'https://www.kantu3d.com/bjq/'

const instance = axios.create({ baseURL })

export default instance
