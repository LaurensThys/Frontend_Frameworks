import {FunctionComponent} from 'react'
import HarvestedIcon from '../utils/harvestedIcon.tsx'
import TrimmedIcon from '../utils/trimmedIcon.tsx'
import PlantedIcon from '../utils/plantedIcon.tsx'
import {IPlot} from '../models/IPlot.ts'
import styled from 'styled-components'
import {useDeletePlot} from '../api/plotApi.ts'
import LoadingPart from '../utils/loadingPart.tsx'
import {Link} from 'react-router-dom'

const PlotContainer = styled.div`
    width: 25% !important;
    padding: 1em;
    border: 1px solid #ffffff;
    color: #ffffff;
    border-radius: 5px;
    margin: .5em;
`

interface PlotProps extends IPlot {

}

const Plot: FunctionComponent<PlotProps> = ({id,state, plant}) => {
const {mutate: deletePlot, isLoading} = useDeletePlot()
    return (
        <PlotContainer>
            {state == 'planted' && <PlantedIcon/>}
            {state == 'trimmed' && <TrimmedIcon/>}
            {state == 'harvested' && <HarvestedIcon/>}
            &nbsp;
            Plot with {plant}
            &nbsp;
            <div>
                <Link to={`${id}`}>View</Link>
                &nbsp;|&nbsp;
                <span className={'link'} onClick={() => deletePlot({id})}>
                    {isLoading && <LoadingPart/>}
                    Delete
                </span>
            </div>
        </PlotContainer>
    )
}

export default Plot
