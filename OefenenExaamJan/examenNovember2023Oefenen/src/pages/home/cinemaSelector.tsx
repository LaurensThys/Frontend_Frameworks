import {FunctionComponent} from 'react'

interface CinemaSelectorProps {
    location: string
    selectCinema: () => void
    selected: boolean
}

const CinemaSelector: FunctionComponent<CinemaSelectorProps> = ({location,selectCinema, selected}) => {
    return (

        <button onClick={selectCinema} className={selected ? 'selected' : ''}>
            {location}
        </button>

    )
}

export default CinemaSelector
