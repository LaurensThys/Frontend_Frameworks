import {FunctionComponent} from 'react'
import {IPlot} from '../../models/IPlot'
import {useNavigate} from 'react-router-dom'

const DetailLayout: FunctionComponent<IPlot> = ({id, state, plant}) => {
    const navigate = useNavigate()
    return (
        <div className={'plot-form'}>
            <h3>Id:</h3>
            <div>{id}</div>
            <h3>State:</h3>
            <div>{state}</div>
            <h3>Plant:</h3>
            <div>{plant}</div>
            <button onClick={() => navigate(-1)}>&lt;-- Terug</button>
        </div>
    )
}

export default DetailLayout
