import { io } from 'socket.io-client'
import axios from "axios"
const URL = axios.defaults.baseURL

export const socket = io(URL)