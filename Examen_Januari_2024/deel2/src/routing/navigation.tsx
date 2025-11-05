import {FunctionComponent, useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import ViewModeContext from '../context/viewModeContext.tsx'
import {useGetUser, useLogin, useLogout} from '../api/userApi.ts'

interface NavigationProps {

}

const Navigation: FunctionComponent<NavigationProps> = () => {
    const {setViewMode} = useContext(ViewModeContext)
    const {data: user} = useGetUser()
    const {mutate: login} = useLogin()
    const {mutate: logout} = useLogout()
    const [email, setEmail] = useState<string>('')

    const loginForm = (
        <div>
            <input value={email} onChange={evt => setEmail(evt.target.value)}
                   style={{display: 'inline-block'}} placeholder="Username"/>
            <button onClick={() => {
                login({email, password: ''})
                setViewMode('admin')
            }}
                    style={{width: 'auto', display: 'inline-block', margin: 0, padding: '0 .5rem'}}>
                login
            </button>
        </div>
    )

    const welcome = (
        <div>
            Welcome {user?.email} (
            <button onClick={() => {
                logout()
                setViewMode('user')
            }} style={{width: 'auto', display: 'inline-block', margin: 0, padding: '0 .5rem'}}>logout
            </button>
            )
        </div>
    )

    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {user ? welcome : loginForm}
                </li>
            </ul>
        </div>
    )
}

export default Navigation
