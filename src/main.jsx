import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { LabelsProvider } from "./useLabels";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LabelsProvider>
    <App />
    </LabelsProvider>
  </React.StrictMode>,
)