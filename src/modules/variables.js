import { getDataFromStorage } from './storage.js'

const storageKey = 'todos'
const todos = getDataFromStorage()

const clockElement = document.querySelector('#clock')
const containerTodoElement = document.querySelector('.container')
const formElement = document.querySelector('#form')
const buttonAddTodoElement = document.querySelector('#addTodoBtn')
const deleteAllButtonElement = document.querySelector('#deleteAllBtn')
const columns = document.querySelectorAll('[data-role="status-column"]')
const countCards = document.querySelectorAll('[data-role="count-cards"]')
// Modals
const formModalElement = document.querySelector('#formModal')
const deleteAllModalElement = document.querySelector('#deleteAllModal')
const confirmBtn = document.querySelector('[data-role="confirm-delete"]')
const cancelBtn = document.querySelector('[data-role="cancel-delete"]')
const progressLimitModalElement = document.querySelector('#progressLimitModal')

const dropDownMenu = document.querySelector('[data-role="dropDownMenu"]')

const statusArr = ['todo', 'progress', 'done']

export {
    storageKey,
    todos,
    clockElement,
    containerTodoElement,
    formElement,
    buttonAddTodoElement,
    deleteAllButtonElement,
    columns,
    countCards,
    formModalElement,
    deleteAllModalElement,
    confirmBtn,
    cancelBtn,
    progressLimitModalElement,
    dropDownMenu,
    statusArr
}