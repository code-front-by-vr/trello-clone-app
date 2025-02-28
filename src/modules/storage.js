import { storageKey } from './variables.js'

function getDataFromStorage() {
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
}

function setDataToStorage(todo) {
    localStorage.setItem(storageKey, JSON.stringify(todo))
}

export { getDataFromStorage, setDataToStorage }