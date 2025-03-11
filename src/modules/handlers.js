import {
    todos,
    formElement,
    formModalElement,
    deleteAllModalElement,
    confirmBtn,
    cancelBtn,
    progressLimitModalElement
} from './variables.js'
import { Todo } from './model.js'
import { toggleModal, render, buildFormModal } from './helpers.js'
import { setDataToStorage } from './storage.js'

function handleClickButtonAddTodo() {
    toggleModal(formModalElement)
    formElement.innerHTML = buildFormModal()
}

function handleClickCloseModal({ target }) {
    const currentModalElement = target.closest('[data-item="modal"]')
    if (target === currentModalElement || target.dataset.role == 'close-modal' || target.dataset.role == 'accept') {
        toggleModal(currentModalElement)
        if (currentModalElement.contains(formElement)) {
            formElement.reset()
        }
    }
}

function handleSubmitForm(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const formDataObject = Object.fromEntries(formData)

    const { editedId } = formElement.dataset
    if (editedId) {
        const editedTodoIndex = todos.findIndex(todo => todo.id == editedId)
        todos[editedTodoIndex] = { ...todos[editedTodoIndex], ...formDataObject }
        setDataToStorage(todos)
        render(todos)
    } else {
        const newTodo = new Todo(formDataObject)
        todos.push(newTodo)
        setDataToStorage(todos)
        render(todos)
    }
    formElement.reset()
    toggleModal(formModalElement)
    delete formElement.dataset.editedId;
}

function handleClickEditTodo({ target }) {
    if (target.dataset.role !== 'edit') return

    const { id } = target.closest('[data-id]').dataset
    const currentTodo = todos.find(todo => todo.id == id)

    toggleModal(formModalElement)

    formElement.innerHTML = buildFormModal()
    const titleInput = formElement.querySelector('[name="title"]');
    const descriptionInput = formElement.querySelector('[name="description"]');
    const userSelect = formElement.querySelector('[name="assignUser"]');

    titleInput.value = currentTodo.title;
    descriptionInput.value = currentTodo.description;
    userSelect.value = currentTodo.assignUser;

    formElement.dataset.editedId = currentTodo.id
}

function handleClickConfirmDeleteAll({ target }) {
    const { role } = target.dataset
    if (role === 'confirm-delete') {
        const newTodos = todos.filter((todo) => todo.status !== 'done')
        todos.length = 0;
        todos.push(...newTodos)
        setDataToStorage(newTodos)
        render(newTodos)
        toggleModal(deleteAllModalElement)
    } else if (role === 'cancel-delete') {
        toggleModal(deleteAllModalElement)
    }
    confirmBtn.removeEventListener('click', handleClickConfirmDeleteAll)
    cancelBtn.removeEventListener('click', handleClickConfirmDeleteAll)
}

function handleClickButtonDeleteAll() {
    const hasDoneTask = todos.find((todo) => todo.status == 'done')
    if (!hasDoneTask) return

    toggleModal(deleteAllModalElement)

    confirmBtn.addEventListener('click', handleClickConfirmDeleteAll);
    cancelBtn.addEventListener('click', handleClickConfirmDeleteAll);
}

function handleChangeSelect({ target }) {
    const newStatus = target.value
    const closestElement = target.closest('[data-id]')

    const progressCards = todos.filter((todo) => todo.status == 'progress').length

    if ((newStatus == 'progress') && progressCards >= 6) {
        toggleModal(progressLimitModalElement)

        const { id } = closestElement.dataset
        const currentTodo = todos.find(todo => todo.id == id)
        target.value = currentTodo.status

        return
    }

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
    handleClickConfirmDeleteAll,
    handleClickEditTodo,
    handleClickCloseModal,
    handleChangeSelect,
    handleDeleteCard
}