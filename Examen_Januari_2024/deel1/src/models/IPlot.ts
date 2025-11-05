export type PlotState = 'planted' | 'trimmed' | 'harvested'

export interface IPlot {
    id?: string
    state: PlotState,
    plant: string
}
