// Pages
import { IndexPage } from "./pages/IndexPage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { Layout } from "./components/Layout"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ChatPage } from "./pages/ChatPage"

// axios
import axios from "axios"
axios.defaults.baseURL = "http://192.168.2.225:4000"
axios.defaults.withCredentials = true

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
