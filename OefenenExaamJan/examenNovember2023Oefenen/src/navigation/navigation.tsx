import {FunctionComponent, useContext} from 'react'
import {Link} from 'react-router-dom'
import ViewModeContext from '../context/viewModeContext.tsx'

interface NavigationProps {

}

const Navigation: FunctionComponent<NavigationProps> = () => {
    const {viewMode, setViewMode} = useContext(ViewModeContext)

    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <select value={viewMode} onChange={evt => setViewMode(evt.target.value as 'admin' | 'user')}>
                        <option value={'admin'}>Admin view</option>
                        <option value={'user'}>Show me what a user sees</option>
                    </select>
                </li>
            </ul>
        </div>
    )
}

export default Navigation