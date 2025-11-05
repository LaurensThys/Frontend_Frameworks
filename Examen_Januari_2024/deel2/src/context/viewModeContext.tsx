import {createContext} from 'react'

interface ViewModeContextProps {
    viewMode: 'admin' | 'user'
    setViewMode: (mode: 'admin' | 'user') => void
}

const ViewModeContext = createContext<ViewModeContextProps>({
    viewMode: 'admin',
    setViewMode: () => {
      console.warn('No implementation available for setViewMode, please provide one.')
    },
})

export default ViewModeContext
