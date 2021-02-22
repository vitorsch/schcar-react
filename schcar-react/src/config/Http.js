import Axios from 'axios'
import { rootUrl } from './App'

export const Http = Axios.create({
    baseURL: rootUrl
})