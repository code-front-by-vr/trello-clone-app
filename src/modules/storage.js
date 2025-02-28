function getDataFromStorage() {
    return JSON.parse(localStorage.getItem('todos')) || []
}

export { getDataFromStorage }