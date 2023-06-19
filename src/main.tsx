import 'simplebar-react/dist/simplebar.min.css';
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SettingsProvider } from './context/settings.context';
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <App />
           </QueryClientProvider>
          </BrowserRouter>
        </SettingsProvider>
     </HelmetProvider>
  </React.StrictMode>,
)
