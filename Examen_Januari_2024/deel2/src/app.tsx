import {FunctionComponent, Suspense, useState} from 'react'
import Navigation from './routing/navigation.tsx'
import Routing from './routing/routing.tsx'
import LoadingPage from './utils/loadingPage.tsx'
import ViewModeContext from './context/viewModeContext.tsx'
import {useGetUser} from './api/userApi.ts'

interface AppProps {

}

const App: FunctionComponent<AppProps> = () => {
    const {data: user} = useGetUser()
    const [viewMode, setViewMode] = useState<'admin' | 'user'>(user ? 'admin' : 'user')

    return (
        <ViewModeContext.Provider value={{viewMode, setViewMode}}>
            <Navigation/>
            <div className="container">
                <Suspense fallback={<LoadingPage/>}>
                    <Routing/>
                </Suspense>
            </div>
        </ViewModeContext.Provider>
    )
}

export default App
