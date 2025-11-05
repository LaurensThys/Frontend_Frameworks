import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import App from './app.tsx'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            useErrorBoundary: false,
            suspense: true,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <App/>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
