import plots from './data/plots.json'

export const PLOTS_KEY = 'plots'

export function generateData(): void {
    localStorage.setItem(PLOTS_KEY, JSON.stringify(plots))
}
