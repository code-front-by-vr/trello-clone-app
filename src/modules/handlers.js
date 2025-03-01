import { todos, formElement, formModalElement } from './variables.js'
import { Todo } from './model.js'
import { countTodosInColumn, toggleModal, render } from './helpers.js'
import { setDataToStorage } from './storage.js'

function handleClickButtonAddTodo() {
    toggleModal()
}

function handleClickButtonDeleteAll() {
    const newTodos = todos.filter((todo) => !(todo.status == 'done'))
    todos.length = 0
    setDataToStorage(newTodos)
    render(newTodos)
    countTodosInColumn(newTodos)
}

function handleClickCloseModal({ target }) {
    if (target === formModalElement || target.dataset.role == 'close') {
        toggleModal()
        formElement.reset()
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
    countTodosInColumn(todos)
    formElement.reset()
    toggleModal()
}
function handleChangeSelect({ target }) {
    const newStatus = target.value
    const closestElement = target.closest('[data-id]')
    if (closestElement) {
        const { id } = closestElement.dataset
        todos.forEach((todo) => {
            if (todo.id == id) {
                todo.status = newStatus
            }
        })
        setDataToStorage(todos)
        render(todos)
        countTodosInColumn(todos)
    }
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
        countTodosInColumn(todos)
    }
}

export {
    handleSubmitForm,
    handleClickButtonAddTodo,
    handleClickButtonDeleteAll,
    handleClickCloseModal,
    handleChangeSelect,
    handleDeleteCard
}