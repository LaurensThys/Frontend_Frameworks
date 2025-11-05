import {generateData} from './generateData.ts'

/**
 * Retrieve an item from localstorage or generate the data if doesn't exist in localstorage.
 *
 * @param storageKey The key that should be used to retrieve items from localstorage.
 */
export function retrieveFromDatabase<T>(storageKey: string): T {
    const storageItem = localStorage.getItem(storageKey)

    if (!storageItem) {
        generateData()
    }

    return JSON.parse(localStorage.getItem(storageKey)!) as T
}


/**
 * Store an item in localstorage using the provided key.
 *
 * @param storageKey The key used to store data.
 * @param data       A serializable object or array of objects.
 * @return {Promise<void>}
 */
export function persistToDatabase(storageKey: string, data: object | object[]): void {
    localStorage.setItem(storageKey, JSON.stringify(data))
}
