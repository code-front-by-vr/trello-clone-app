import { todos, formElement, cruidModalElement } from './variables.js'
import { Todo } from './model.js'
import { toggleModal, render } from './helpers.js'

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
    render(todos, newTodo)
    formElement.reset()
    toggleModal()
}

export { handleSubmitForm, handleClickButtonAddTodo, handleClickCloseModal }