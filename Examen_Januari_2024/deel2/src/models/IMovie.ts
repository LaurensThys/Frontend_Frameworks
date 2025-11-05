import {ICrew} from './ICrew.ts'
import {ISchedule} from './ISchedule.ts'

export interface IMovie {
    id: string
    title: string
    year: number
    runtime: number
    genre: string
    directors: ICrew[]
    writers: ICrew[]
    actors: ICrew[]
    plot: string
    language: string
    country: string
    awards: string
    poster: string
    imdbRating: number
    boxOffice: string
    schedule: ISchedule[]
}
