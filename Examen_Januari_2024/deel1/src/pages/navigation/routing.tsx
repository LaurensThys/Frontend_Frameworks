import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Garden from '../Garden.tsx'
import PlotDetail from '../detail/plotDetail.tsx'

interface NavigationProps {

}

const Routing: FunctionComponent<NavigationProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Outlet/>}>
                <Route index element={<Garden/>}/>
                <Route path={':id'} element={<PlotDetail/>}/>
            </Route>
        </Routes>
    )
}

export default Routing