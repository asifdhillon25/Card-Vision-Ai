// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(220 20% 12%)',
            color: 'hsl(210 20% 98%)',
            border: '1px solid hsl(220 13% 22%)',
          },
          success: {
            iconTheme: {
              primary: 'hsl(160 84% 55%)',
              secondary: 'hsl(220 25% 10%)',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(350 89% 60%)',
              secondary: 'hsl(210 20% 98%)',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)