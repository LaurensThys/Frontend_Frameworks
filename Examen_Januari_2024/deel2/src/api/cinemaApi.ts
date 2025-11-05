import {retrieveFromDatabase} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.ts'
import {CINEMA_KEY} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/generateData.ts'
import {ICinema} from '../models/ICinema.ts'
import {useQuery, UseQueryResult} from '@tanstack/react-query'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */


export const useGetAllCinemas = (): UseQueryResult<ICinema[], Error> => {
    return useQuery({
        queryKey: ['cinemas'],
        queryFn: getAllCinemas,
    })
}

//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all cinemas in the database.
 */
function getAllCinemas(): ICinema[] {
    return retrieveFromDatabase<ICinema[]>(CINEMA_KEY)
}

//endregion
