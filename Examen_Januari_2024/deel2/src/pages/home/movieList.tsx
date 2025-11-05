import {FunctionComponent} from 'react'
import {useGetAllMoviesForCinema} from '../../api/movieApi.ts'
import Movie from './movie.tsx'

interface MovieListProps {
    cinemaId: string | null
}

const MovieList: FunctionComponent<MovieListProps> = ({cinemaId}) => {
    const {data: movies} = useGetAllMoviesForCinema(cinemaId)

    return (
        <div className="movie-list">
            {movies?.map(m => <Movie {...m} key={m.id}/>)}
        </div>
    )
}

export default MovieList
