import { todos, formElement, formModalElement, deleteAllModalElement } from './variables.js'
import { Todo } from './model.js'
import { toggleFormModal, toggleDeleteAllModal, render } from './helpers.js'
import { setDataToStorage } from './storage.js'

function handleClickButtonAddTodo() {
    toggleFormModal()
}

function handleClickCloseModal({ target }) {
    if (target === formModalElement || target.dataset.role == 'close-form-modal') {
        toggleFormModal()
        formElement.reset()
    }
    if (target === deleteAllModalElement || target.dataset.role == 'close-delete-modal') {
        toggleDeleteAllModal()
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
    toggleFormModal()
}

function handleClickButtonDeleteAll() {
    const hasDoneTask = todos.find((todo) => todo.status == 'done')
    if (!hasDoneTask) return

    toggleDeleteAllModal()

    const cofirmBtn = document.querySelector('[data-role="confirm-delete"]')
    const cancelBtn = document.querySelector('[data-role="cancel-delete"]')

    function onConfirm() {
        const newTodos = todos.filter((todo) => todo.status !== 'done')
        todos.length = 0;
        todos.push(...newTodos)
        setDataToStorage(newTodos)
        render(newTodos)
        closeModal()
    }

    function onCancel() {
        closeModal()
    }

    function closeModal() {
        toggleDeleteAllModal()
        cofirmBtn.removeEventListener('click', onConfirm)
        cancelBtn.removeEventListener('click', onCancel)
    }

    cofirmBtn.addEventListener('click', onConfirm)
    cancelBtn.addEventListener('click', onCancel)
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
    }
}

function handleDeleteCard({ target }) {
    const { role } = target.dataset
    if (role == 'remove') {
        const cardElement = target.closest('.card')
        const { id } = cardElement.dataset
        const index = todos.findIndex((todo) => todo.id == id)
        if (index !== -1) {
            todos.splice(index, 1)
            setDataToStorage(todos)
            render(todos)
        }
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