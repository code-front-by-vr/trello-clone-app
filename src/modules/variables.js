import { getDataFromStorage } from './storage.js'
const storageKey = 'todos'
const todos = getDataFromStorage()

const containerTodoElement = document.querySelector('.container-todo')
const formElement = document.querySelector('#form')
const buttonAddTodoElement = document.querySelector('#add-todo-btn')
const deleteAllButtonElement = document.querySelector('#delete-all-btn')
const todoContainerElement = document.querySelector('#todo')
const inProgressContainerElement = document.querySelector('#progress')
const doneContainerElement = document.querySelector('#done')
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
    statusArr,
}