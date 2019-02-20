import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'decks'

export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((items) => JSON.parse(items))
}

export function saveDeck (key, deck) {
    return AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({[key]: deck})
    )
}

export function addCardToDeck() {}

export function deleteDeck(key) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
}

export function clearStorage()  {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))

    //AsyncStorage.removeItem(STORAGE_KEY)
}
