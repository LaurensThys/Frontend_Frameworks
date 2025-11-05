import {FunctionComponent} from 'react'
import {useGetAllPlots} from '../api/plotApi.ts'
import Plot from './Plot.tsx'

interface PlotListProps {

}

const PlotList: FunctionComponent<PlotListProps> = () => {
const {data: plots} = useGetAllPlots()
    return (
        <>
            <div className={'filters'}>
                {/* PLAATS HIER DE FILTERS. */}
            </div>

            <div className={'plots'}>
                {plots?.map(p => (
                    <Plot {...p} key={p.id}/>
                ))}
            </div>
        </>
    )
}

export default PlotList
