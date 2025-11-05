import actors from './data/actors.json'
import directors from './data/directors.json'
import movies from './data/movies.json'
import writers from './data/writers.json'
import {IMovie} from '../../models/IMovie.ts'
import {shuffle} from './utils.ts'
import {ICinema} from '../../models/ICinema.ts'
import {faker} from '@faker-js/faker'
import {ISchedule} from '../../models/ISchedule.ts'

export const MOVIE_KEY = 'movies'
export const CINEMA_KEY = 'cinemas'
export const ACTOR_KEY = 'actors'
export const WRITER_KEY = 'writers'
export const DIRECTOR_KEY = 'directors'

const cinemas: ICinema[] = [
    {
        location: 'Geel',
        id: '0b711599-acee-4b10-aa8a-cfd5c913b62d',
    },
    {
        location: 'Turnhout',
        id: 'de7afcdb-ffbf-4cc2-b2f8-72d72f3288df',
    },
    {
        location: 'Lier',
        id: 'c876db67-6e67-4b57-b2b5-f19b4c176e27',
    },
]

export function generateData(): void {
    localStorage.setItem(CINEMA_KEY, JSON.stringify(cinemas))
    localStorage.setItem(ACTOR_KEY, JSON.stringify(actors))
    localStorage.setItem(DIRECTOR_KEY, JSON.stringify(directors))
    const selectedMovies = faker.helpers.arrayElements(faker.helpers.shuffle(movies), 10) as IMovie[]
    scheduleMovies(selectedMovies)
    localStorage.setItem(MOVIE_KEY, JSON.stringify(selectedMovies))
    localStorage.setItem(WRITER_KEY, JSON.stringify(writers))
}

export function scheduleMovies(movies: IMovie[]): void {
    for (const movie of movies) {
        const schedule: ISchedule[] = []
        const scheduleLength = faker.number.int({min: 1, max: 3})
        for (let i = 0; i < scheduleLength; i++) {
            schedule.push({
                time: faker.date.soon({days: 14}).toLocaleString(),
                cinemaId: faker.helpers.arrayElement(cinemas).id,
                id: faker.string.uuid(),
            })
        }
        movie.schedule = schedule
    }
}

export function getRandomUnusedMovie(): IMovie {
    const usedMovies = new Set<string>((JSON.parse(localStorage.movies) as IMovie[]).map(m => m.id))
    const availableMovies = (movies as IMovie[]).filter(m => !usedMovies.has(m.id)).map(m => ({...m}))
    const selectedMovie = shuffle(availableMovies)[0]
    scheduleMovies([selectedMovie])
    return selectedMovie
}


