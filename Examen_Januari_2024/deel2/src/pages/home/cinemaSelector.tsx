import {FunctionComponent} from 'react'

interface CinemaSelectorProps {
    location: string
    selectCinema: () => void
    isSelected: boolean
}

const CinemaSelector: FunctionComponent<CinemaSelectorProps> = ({location, selectCinema, isSelected}) => {
    return (

        <button onClick={selectCinema} className={isSelected ? 'selected' : ''} data-cy={'cinema-selector'}>
            {location}
        </button>

    )
}

export default CinemaSelector
