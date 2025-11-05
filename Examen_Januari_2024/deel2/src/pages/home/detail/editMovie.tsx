import {FunctionComponent, useState} from 'react'
import {IMovie} from '../../../models/IMovie.ts'
import {useNavigate} from 'react-router-dom'
import {useAddActorToMovie} from '../../../api/movieApi.ts'

const EditMovie: FunctionComponent<IMovie> = ({title, plot, actors, id}) => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const {mutate: addActor} = useAddActorToMovie()

    return (
        <>
            <div className="prev-button">
                <button  onClick={() => navigate(-1)}>
                    <h1>&lt;---</h1>
                </button>
                <h1>{title}</h1>
            </div>

            <p>
                {plot}
            </p>

            <h3>Actors</h3>

            <div className="actor-input">
                <input placeholder="Name" value={name} onChange={(evt) => setName(evt.target.value)}/>
                <button onClick={() => addActor({movieId: id, name})}>Add actor</button>
            </div>

            <ul>
                {actors.map(a => <li key={a.id}>{a.name}</li>)}
            </ul>
        </>
    )
}

export default EditMovie
