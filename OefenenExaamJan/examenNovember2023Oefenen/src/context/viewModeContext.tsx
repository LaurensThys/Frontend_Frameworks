import {createContext} from 'react'

interface ViewModeContextProps {
    viewMode: 'admin' | 'user'
    setViewMode: (newMode: 'admin' | 'user') => void
}

const ViewModeContext = createContext<ViewModeContextProps>({
    viewMode: 'admin',
    setViewMode: () => {
        console.warn('No implementation for setViewMode')
    },
})

export default ViewModeContext