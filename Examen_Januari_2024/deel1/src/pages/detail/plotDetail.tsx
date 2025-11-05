import {FunctionComponent} from 'react'
import DetailLayout from './DetailLayout.tsx'
import {useParams} from 'react-router-dom'
import {useGetPlotById} from '../../api/plotApi.ts'

interface PlotDetailProps {

}

const PlotDetail: FunctionComponent<PlotDetailProps> = () => {
    const {id} = useParams()
    const {data: plot} = useGetPlotById(id)
    return (
        <>
            <DetailLayout {...plot}/>
        </>
    )
}

export default PlotDetail