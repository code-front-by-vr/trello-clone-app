import { getDataFromStorage } from './storage.js'
const storageKey = 'todos'
const todos = getDataFromStorage()
const clockElement = document.querySelector('#clock')
const containerTodoElement = document.querySelector('.container-todo')
const formElement = document.querySelector('#form')
const buttonAddTodoElement = document.querySelector('#addTodoBtn')
const deleteAllButtonElement = document.querySelector('#deleteAllBtn')
const [todoContainerElement, inProgressContainerElement, doneContainerElement,] = document.querySelectorAll('[data-role="status-column"]')
const [todoCountElement, inProgressCountElement, doneCountElement] = document.querySelectorAll('[data-role="count-cards"]')
// Modals
const formModalElement = document.querySelector('#formModal')
const deleteAllModalElement = document.querySelector('#deleteAllModal')
const confirmBtn = document.querySelector('[data-role="confirm-delete"]');
const cancelBtn = document.querySelector('[data-role="cancel-delete"]');
const progressLimitModalElement = document.querySelector('#progressLimitModal')

const statusArr = ['todo', 'progress', 'done']

export {
    containerTodoElement,
    storageKey,
    todos,
    clockElement,
    formElement,
    buttonAddTodoElement,
    deleteAllButtonElement,
    todoContainerElement,
    inProgressContainerElement,
    doneContainerElement,
    formModalElement,
    deleteAllModalElement,
    confirmBtn,
    cancelBtn,
    progressLimitModalElement,
    todoCountElement,
    inProgressCountElement,
    doneCountElement,
    statusArr
}