import { getDataFromStorage } from './storage.js'

const todos = getDataFromStorage()

const formElement = document.querySelector('#form')
const buttonAddTodoElement = document.querySelector('#add-todo-btn')
const deleteAllButtonElement = document.querySelector('#delete-all-btn')
// TODO(start): check if it's used, or delete if it isn't
const todoContainerElement = document.querySelector('#todo')
const inProgressContainerElement = document.querySelector('#in-progress')
const doneContainerElement = document.querySelector('#done')
// TODO(finish)
const cruidModalElement = document.querySelector('#cruid-modal')
const statusArr = ['todo', 'in-progress', 'done']
export {
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