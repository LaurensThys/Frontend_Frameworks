import {FunctionComponent} from 'react'
import useIsAdmin from '../../../hooks/useIsAdmin.ts'
import {Navigate, useParams} from 'react-router-dom'
import {useGetMovieById} from '../../../api/movieApi.ts'
import EditMovie from './editMovie.tsx'

const DetailPage: FunctionComponent = () => {
    const isAdmin = useIsAdmin()
    const {id} = useParams()
    const{data: movie, isFetched} = useGetMovieById(id!)

    if (!isAdmin || isFetched && !movie) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <EditMovie {...movie!}/>
        </>
    )
}

export default DetailPage
