import {FunctionComponent, useState} from 'react'
import PlotList from './PlotList.tsx'
import {useCreatePlot} from '../api/plotApi.ts'
import {IPlot} from '../models/IPlot.ts'
import HarvestedIcon from '../utils/harvestedIcon.tsx'
import PlantedIcon from '../utils/plantedIcon.tsx'
import TrimmedIcon from '../utils/trimmedIcon.tsx'


interface GardenProps extends IPlot{

}

const Garden: FunctionComponent<GardenProps> = ({state}) => {
    const [plantName, setPlantName] = useState<string>('')
    const {mutate: addPlot} = useCreatePlot()
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }


    return (
        <>
            <div className={'plot-form'}>
                <h2>Plots</h2>
                <form>
                    <input placeholder="Plant name" type="text" value={plantName}
                           onChange={(evt) => setPlantName(evt.target.value)}/>
                    <select>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                </form>
                <button onClick={() => addPlot({plantName, state})}>+ add</button>
            </div>
            <div className="filters">
                <label>
                    <PlantedIcon/>
                    <input type="checkbox"
                           checked={isChecked}
                           onChange={handleCheckboxChange}/>
                </label>

                <label>
                    <TrimmedIcon/>
                    <input type="checkbox"
                           checked={isChecked}
                           onChange={handleCheckboxChange}/>
                </label>
                <label>
                <HarvestedIcon/>
                <input type="checkbox"
                       checked={isChecked}
                       onChange={handleCheckboxChange}/>
                </label>
            </div>
            <PlotList/>

        </>
    )
}



export default Garden
