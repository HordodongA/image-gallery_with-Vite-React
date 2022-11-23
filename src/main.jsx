import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ErrorBoundary from "./ErrorBoundary.jsx"

ReactDOM.createRoot(document.getElementById('app')).render(
<ErrorBoundary>
<App />
</ErrorBoundary>
)
