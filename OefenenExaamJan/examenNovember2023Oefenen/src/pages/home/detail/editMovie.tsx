import {FunctionComponent} from 'react'
import {IMovie} from '../../../models/IMovie.ts'

const EditMovie: FunctionComponent<IMovie> = ({title, plot, actors}) => {

    return (
        <>
            <div className="prev-button">
                <button>
                    <h1>&lt;---</h1>
                </button>
                <h1>{title}</h1>
            </div>

            <p>
                {plot}
            </p>

            <h3>Actors</h3>

            <div className="actor-input">
                <input placeholder="Name"/>
                <button>Add actor</button>
            </div>

            <ul>
                {actors.map(a => <li key={a.id}>{a.name}</li>)}
            </ul>
        </>
    )
}

export default EditMovie
