import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import '../Styles/index.css'
import logo from "../src/assets/logo.png";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App logo={logo} />
  </BrowserRouter>
)
