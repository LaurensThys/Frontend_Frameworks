import {FunctionComponent} from 'react'
import {IMovie} from '../../models/IMovie.ts'
import styled from 'styled-components'
import useIsAdmin from '../../hooks/useIsAdmin.ts'
import {useNavigate} from 'react-router-dom'

const MovieContainer = styled.div`
  background: #2b2d30;
  color: #aabdc1;
  display: flex;
  margin: .5rem 0;
  width: 100%;
  max-height: 22rem;

  & > div {
    width: 100%;
    margin: .5rem;
  }

  div:first-child {
    width: auto;
    margin: 0;
  }

  img {
    height: 22rem;
    margin-right: .5rem;
  }

  .plot {
    height: 8rem;
    overflow-y: scroll;
    margin: .5rem .25rem .5rem 0;
  }

  .schedule {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  h3 {
    margin-bottom: 0;
  }
`

const Movie: FunctionComponent<IMovie> = ({poster, title, plot, schedule, actors, writers, directors, id}) => {
    const isAdmin = useIsAdmin()
    const navigate = useNavigate()

    return (
        <MovieContainer data-cy={'movie'}>
            <div>
                <img src={poster} alt={`${title} poster`}/>
            </div>
            <div>
                <h3>{title}</h3>
                <div>Actors: {actors.map(x => x.name).join(' | ')}</div>
                <div>Director(s): {directors.map(x => x.name).join(' | ')}</div>
                <div>Writers: {writers.map(x => x.name).join(' | ')}</div>
                <div>Cinema: {Array.from(new Set(schedule.map(s => s.cinemaLocation))).join(', ')}</div>

                <div className="plot">{plot}</div>

                <div className="schedule">
                    {schedule.map(s => <div key={s.time}>{s.time}</div>)}
                </div>

                {isAdmin && (
                    <div>
                        <button onClick={() => navigate(id)}>Edit</button>
                    </div>
                )}
            </div>
        </MovieContainer>
    )
}

export default Movie
