import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SiteContentProvider } from './content/SiteContentProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteContentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteContentProvider>
  </StrictMode>,
)
