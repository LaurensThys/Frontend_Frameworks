import {faker} from '@faker-js/faker'
import {generateData} from './generateData.ts'

/**
 * Retrieve an item from localstorage or generate the data if doesn't exist in localstorage.
 *
 * @param storageKey The key that should be used to retrieve items from localstorage.
 * @param timeout    Whether or not to implement an artificial timeout, defaults to true.
 */
export async function retrieveFromDatabase<T>(storageKey: string, timeout: boolean = true): Promise<T> {
    const storageItem = localStorage.getItem(storageKey)

    if (!storageItem) {
        generateData()
    }

    if (timeout) {
        await generateArtificialTimeout()
    }

    return JSON.parse(localStorage.getItem(storageKey)!) as T
}


/**
 * Store an item in localstorage using the provided key.
 *
 * @param storageKey The key used to store data.
 * @param data       A serializable object or array of objects.
 * @param timeout    Whether to use an artificial timeout, defaults to true.
 * @return {Promise<void>}
 */
export async function persistToDatabase(storageKey: string, data: object | object[], timeout: boolean = true): Promise<void> {
    localStorage.setItem(storageKey, JSON.stringify(data))
    if (timeout) {
        await generateArtificialTimeout()
    }
}

/**
 * Wait for a few milliseconds to generate an async fetch call.
 *
 * @return A promise that will revolve within 1500ms but no sooner than 250ms.
 */
function generateArtificialTimeout(): Promise<void> {
    const timeout = faker.number.int({min: 250, max: 1500})
    return new Promise(r => setTimeout(r, timeout))
}
