import {IMovie} from '../models/IMovie.ts'
import {
    persistToDatabase,
    retrieveFromDatabase,
} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.ts'
import {getRandomUnusedMovie, MOVIE_KEY} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/generateData.ts'
import {faker} from '@faker-js/faker'
import {useQuery, UseQueryResult} from '@tanstack/react-query'


//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */
export const useGetAllMoviesForCinema = (cinemaId: string | null): UseQueryResult<IMovie[], Error> => {
    return useQuery({
        queryKey: ['movies', cinemaId],
        queryFn: () => getAllMoviesForCinema(cinemaId),
    })
}



//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all movies that are currently stored in the database.
 *
 * @param cinemaId The id of the cinema for which the movies must be retrieved,
 */
async function getAllMoviesForCinema(cinemaId: string | null): Promise<IMovie[]> {
    const movies = await retrieveFromDatabase<IMovie[]>(MOVIE_KEY)
    if (cinemaId) {
        movies.forEach(m => m.schedule = m.schedule.filter(s => s.cinemaId === cinemaId))
        return movies.filter(m => m.schedule.length > 0)
    }
    return movies
}

/**
 * Retrieve a specific movie using its IMDB id.
 *
 * @param id The IMDB id of the movie.
 */
async function getMovieById(id: string): Promise<IMovie | undefined> {
    return (await retrieveFromDatabase<IMovie[]>(MOVIE_KEY)).find(m => m.id === id)
}

/**
 * Add a new random movie to the database.
 *
 * @return The newly created movie.
 */
async function createMovie(): Promise<IMovie> {
    const movies = await retrieveFromDatabase<IMovie[]>(MOVIE_KEY)
    const newMovie = getRandomUnusedMovie()
    await persistToDatabase(MOVIE_KEY, [newMovie, ...movies])
    return newMovie
}

interface AddActorToMovieProps {
    movieId: string
    name: string
}

async function addActorToMovie({movieId, name}: AddActorToMovieProps): Promise<IMovie> {
    const movies = await retrieveFromDatabase<IMovie[]>(MOVIE_KEY)
    const movie = movies.find(m => m.id === movieId)
    movie?.actors.push({
        id: faker.string.uuid(),
        name,
    })

    if (!movie) {
        throw new Error(`The movie doesn't exist.`)
    }

    await persistToDatabase(MOVIE_KEY, movies)
    return movie
}

//endregion
