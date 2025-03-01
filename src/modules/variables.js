import { getDataFromStorage } from './storage.js'
const storageKey = 'todos'
const todos = getDataFromStorage()
const containerTodoElement = document.querySelector('.container-todo')
const formElement = document.querySelector('#form')
const buttonAddTodoElement = document.querySelector('#add-todo-btn')
const deleteAllButtonElement = document.querySelector('#delete-all-btn')
const todoContainerElement = document.querySelector('#todo')
const todoCountElement = document.querySelector('#todoCount')
const inProgressContainerElement = document.querySelector('#progress')
const inProgressCountElement = document.querySelector('#progressCount')
const doneContainerElement = document.querySelector('#done')
const doneCountElement = document.querySelector('#doneCount')
const cruidModalElement = document.querySelector('#cruid-modal')
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
    cruidModalElement,
    todoCountElement,
    inProgressCountElement,
    doneCountElement,
    statusArr,
}