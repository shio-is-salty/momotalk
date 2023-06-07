import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { UserContextProvider } from './context/UserContext'
import { RoomContextProvider } from './context/RoomContext'
import { MessageContextProvider } from './context/MessageContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RoomContextProvider>
        <MessageContextProvider>

          <App />

        </MessageContextProvider>
      </RoomContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
