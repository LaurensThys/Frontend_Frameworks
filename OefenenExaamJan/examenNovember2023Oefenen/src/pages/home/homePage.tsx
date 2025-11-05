import {FunctionComponent, useContext, useEffect, useState} from 'react'
import {useGetAllCinemas} from '../../api/cinemaApi.ts'
import CinemaSelector from './cinemaSelector.tsx'
import viewModeContext from '../../context/viewModeContext.tsx'

const HomePage: FunctionComponent = () => {
    const {data: cinemas} = useGetAllCinemas()
    const [selectedCinema, setSelectedCinema] = useState<string | null>(null)
    const {viewMode} = useContext(viewModeContext)

    useEffect(() => {
        if (viewMode != 'admin' && selectedCinema === null && cinemas) {
            setSelectedCinema(cinemas[0].id)
        }
    }, [cinemas, selectedCinema, viewMode])

    return (
        <>
            <div className="cinema-selector">
                {viewMode === 'admin' && <CinemaSelector location={'All'}
                                                         selectCinema={() => setSelectedCinema(null)}
                                                         selected={selectedCinema === null}/>}
                {cinemas?.map(c => (
                    <CinemaSelector {...c} key={c.id} selected={c.id === selectedCinema}
                                    selectCinema={() => setSelectedCinema(c.id)}/>
                ))}
            </div>

            {/* TOON DE LIJST VAN FILMS HIERONDER */}
        </>
    )
}

export default HomePage
