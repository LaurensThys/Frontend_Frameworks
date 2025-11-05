import {
    persistToDatabase,
    retrieveFromDatabase
} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.ts'
import {PLOTS_KEY} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/generateData.ts'
import {IPlot} from '../models/IPlot'
import {faker} from '@faker-js/faker'
import {QueryKey, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'



//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */
interface OptimisticContext<T> {
    oldData: T
    queryKey: QueryKey
}

export const useGetPlotById = (id: string): useQueryResult<IPlot, Error> => {
    return useQuery({
        queryKey:['plots', id],
        queryFn: () => getPlotById(id)
    })
}

export const useGetAllPlots = (): UseQueryResult<IPlot[], Error> => {
    return useQuery({
        queryKey: ['plots'],
        queryFn: getAllPlots,
    })
}

export const useDeletePlot = (): UseMutationResult<void, Error, DeletePlotProps, OptimisticContext<IPlot[]>> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deletePlot,
        onMutate: async ({id}) => {
            const queryKey = ['plots']
            await queryClient.cancelQueries({queryKey})
            const oldData = queryClient.getQueryData<IPlot[]>(queryKey) ?? []
            queryClient.setQueryData<IPlot[]>(queryKey, old => old?.filter(l => l.id !== id))
            return {oldData, queryKey}
        },
        onError: (_, __, context) => {
            if (context) {
                queryClient.setQueryData<IPlot[]>(context.queryKey, context.oldData)
            }
        },
    })
}
interface UseCreatePlotContext {
    queryKey: QueryKey
    oldData?: IPlot
}
export const useCreatePlot = (): UseMutationResult<IPlot, Error, AddPlotProps, UseCreatePlotContext> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createPlot,
        onMutate: ({id, state, plant}) => {
            const queryKey = ['plots', id, state, plant]
            const oldData = queryClient.getQueryData<IPlot>(queryKey)
            const newData = {...oldData, plots: [...oldData?.plots ?? [], {id: 'temp', state, plant}]}
            queryClient.setQueryData(queryKey, newData)
            return {queryKey, oldData}
        },
        onError:  (context) => {
            if (context) {
                queryClient.setQueryData(context.queryKey, context.oldData)
            }
        },
        onSettled: (newPlot, _, __, context) => {
            if (context && newPlot) {
                queryClient.setQueryData(context.queryKey, newPlot)
            }
        }
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
 * Retrieve all plots in the database.
 */
async function getAllPlots(): Promise<IPlot[]> {
    return retrieveFromDatabase<IPlot[]>(PLOTS_KEY)
}

/**
 * Retrieve a specific plot using its id.
 *
 * @param id The id of the movie.
 */
async function getPlotById(id: string): Promise<IPlot | undefined> {
    return (await retrieveFromDatabase<IPlot[]>(PLOTS_KEY)).find(m => m.id === id)
}

interface AddPlotProps {
    plot: IPlot
}

/**
 * Add a new plot to the database.
 *
 * @param The plot that should be added to the database, can optionally include the id of the new plot.
 * @return The newly created plot.
 */
async function createPlot({plot}: AddPlotProps): Promise<IPlot> {
    if (!plot.id) {
        plot.id = faker.string.uuid()
    }
    const plots = await retrieveFromDatabase<IPlot[]>(PLOTS_KEY)
    await persistToDatabase(PLOTS_KEY, [plot, ...plots])
    return plot
}

interface DeletePlotProps {
    id: string
}

/**
 * Delete a plot from the database.
 *
 * @param id The id of the plot that must be deleted.
 * @return
 */
async function deletePlot({id}: DeletePlotProps): Promise<void> {
    const plots = await retrieveFromDatabase<IPlot[]>(PLOTS_KEY)
    await persistToDatabase(PLOTS_KEY, plots.filter(p => p.id !== id))
}

//endregion
