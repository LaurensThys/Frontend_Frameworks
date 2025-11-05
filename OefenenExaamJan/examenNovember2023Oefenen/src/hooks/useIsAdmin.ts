import {useContext} from 'react'
import ViewModeContext from '../context/viewModeContext.tsx'

const useIsAdmin = (): boolean => {
    const {viewMode} = useContext(ViewModeContext)
    return viewMode === 'admin'
}

export default useIsAdmin
