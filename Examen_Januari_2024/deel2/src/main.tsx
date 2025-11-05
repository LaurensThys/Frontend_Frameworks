import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './app.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import './main.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            useErrorBoundary: false,
            suspense: true,
        },
    },
})

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
