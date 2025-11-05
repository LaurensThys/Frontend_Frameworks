import {FunctionComponent, Suspense} from 'react'
import Routing from './pages/navigation/routing.tsx'
import LoadingPage from './utils/loadingPage.tsx'
import ColorPicker from './context/colorPicker.tsx'

interface AppProps {

}

const App: FunctionComponent<AppProps> = () => {
    return (
        <>//ColorPicker.Provider
            <Suspense fallback={<LoadingPage/>}>
                <Routing/>
            </Suspense>
        </>///ColorPicker.Provider>
    )
}

export default App