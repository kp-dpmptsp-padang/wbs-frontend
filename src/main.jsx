import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'preline/dist/preline.js';
import './styles/input.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
