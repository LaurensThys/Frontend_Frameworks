import {FunctionComponent} from 'react'
import {IMovie} from '../../models/IMovie.ts'

const Movie: FunctionComponent<IMovie> = ({poster, title, plot, schedule, actors, writers, directors}) => {
    return (
        <>
            <div>
                <img src={poster} alt={`${title} poster`}/>
            </div>
            <div>
                <h3>{title}</h3>
                <div>Actors: {actors.map(x => x.name).join(' | ')}</div>
                <div>Director(s): {directors.map(x => x.name).join(' | ')}</div>
                <div>Writers: {writers.map(x => x.name).join(' | ')}</div>

                <div className="plot">{plot}</div>

                <div className="schedule">
                    {schedule.map(s => <div key={s.time}>{s.time}</div>)}
                </div>

                <div>
                    <button>Edit</button>
                </div>
            </div>
        </>
    )
}

export default Movie
