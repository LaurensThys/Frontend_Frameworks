import {FunctionComponent} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import HomePage from '../pages/home/homePage.tsx'
import DetailPage from '../pages/home/detail/detailPage.tsx'

interface RoutingProps {

}

const Routing: FunctionComponent<RoutingProps> = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Outlet/>}>
                <Route index element={<HomePage/>}/>
                <Route path={':id'} element={<DetailPage/>}/>
            </Route>
        </Routes>
    )
}

export default Routing
