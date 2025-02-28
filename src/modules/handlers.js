import { todos, formElement, cruidModalElement } from './variables.js'
import { Todo } from './model.js'
import { toggleModal, render } from './helpers.js'
import { setDataToStorage } from './storage.js'

function handleClickButtonAddTodo() {
    toggleModal()
}

function handleClickCloseModal({ target }) {
    if (target === cruidModalElement || target.dataset.role == 'close') {
        toggleModal()
    }
}

function handleSubmitForm(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formDataObject = Object.fromEntries(formData)
    const newTodo = new Todo(formDataObject)
    todos.push(newTodo)
    setDataToStorage(todos)
    render(todos)
    formElement.reset()
    toggleModal()
}

function handleDeleteCard({ target }) {
    const { role } = target.dataset
    if (role == 'remove') {
        const cardElement = target.closest('.card')
        const { id } = cardElement.dataset
        const removedTodo = todos.filter((todo) => todo.id === id)
        todos.splice(removedTodo, 1)
        setDataToStorage(todos)
        render(todos)
    }
}

export { handleSubmitForm, handleClickButtonAddTodo, handleClickCloseModal, handleDeleteCard }