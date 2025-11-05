import {FunctionComponent, Suspense, useEffect, useState} from 'react'
import {useGetAllCinemas} from '../../api/cinemaApi.ts'
import CinemaSelector from './cinemaSelector.tsx'
import LoadingPart from '../../utils/loadingPart.tsx'
import MovieList from './movieList.tsx'
import useIsAdmin from '../../hooks/useIsAdmin.ts'
import {useCreateMovie} from '../../api/movieApi.ts'

interface HomeProps {

}

const HomePage: FunctionComponent<HomeProps> = () => {
    const {data: cinemas} = useGetAllCinemas()
    const {mutate: createMovie, isLoading} = useCreateMovie()
    const isAdmin = useIsAdmin()
    const [selectedCinema, setSelectedCinema] = useState<null | string>(null)

    useEffect(() => {
        if (!isAdmin && !selectedCinema) {
            setSelectedCinema(cinemas ? cinemas[0]?.id : null)
        }
    }, [cinemas, isAdmin, selectedCinema])

    return (
        <>
            <div className="cinema-selector">
                <CinemaSelector location="All" isSelected={selectedCinema === null}
                                            selectCinema={() => setSelectedCinema(null)}/>
                {cinemas?.map(c => (
                    <CinemaSelector location={c.location} isSelected={selectedCinema === c.id}
                                    selectCinema={() => setSelectedCinema(c.id)} key={c.id}/>
                ))}
            </div>

            {isAdmin && (
                <div>
                    <button onClick={() => createMovie()} disabled={isLoading} data-cy={'add-movie'}>
                        + Add movie
                        {isLoading && <LoadingPart/>}
                    </button>
                </div>
            )}

            <Suspense fallback={<LoadingPart/>}>
                <MovieList cinemaId={selectedCinema}/>
            </Suspense>
        </>
    )
}

export default HomePage
