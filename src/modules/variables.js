import { getDataFromStorage } from './storage.js'
const storageKey = 'todos'
const todos = getDataFromStorage()
const containerTodoElement = document.querySelector('.container-todo')
const formElement = document.querySelector('#form')
const buttonAddTodoElement = document.querySelector('#addTodoBtn')
const deleteAllButtonElement = document.querySelector('#deleteAllBtn')
const [todoContainerElement, inProgressContainerElement, doneContainerElement,] = document.querySelectorAll('[data-role="status-column"]')
const [todoCountElement, inProgressCountElement, doneCountElement] = document.querySelectorAll('[data-role="count-cards"]')

const formModalElement = document.querySelector('#formModal')
const deleteAllModalElement = document.querySelector('#deleteAllModal')

const statusArr = ['todo', 'progress', 'done']

export {
    containerTodoElement,
    storageKey,
    todos,
    formElement,
    buttonAddTodoElement,
    deleteAllButtonElement,
    todoContainerElement,
    inProgressContainerElement,
    doneContainerElement,
    formModalElement,
    deleteAllModalElement,
    todoCountElement,
    inProgressCountElement,
    doneCountElement,
    statusArr,
}