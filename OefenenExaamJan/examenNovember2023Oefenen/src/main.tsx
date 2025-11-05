import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './main.css'
import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById('root')!)


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
            suspense: true,
            useErrorBoundary: false,
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
