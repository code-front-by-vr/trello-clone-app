import {
    todos,
    formElement,
    formModalElement,
    deleteAllModalElement,
    confirmBtn,
    cancelBtn,
    progressLimitModalElement,
    dropDownMenu,
} from './variables.js'
import { Todo } from './model.js'
import { toggleModal, render, buildFormModal } from './helpers.js'
import { setDataToStorage } from './storage.js'

function handleClickCloseModal({ target }) {
    const currentModalElement = target.closest('[data-item="modal-overlay"]')
    if (target === currentModalElement || target.dataset.role == 'close-modal' || target.dataset.role == 'accept') {
        toggleModal(currentModalElement)
        if (currentModalElement.contains(formElement)) {
            formElement.reset()
        }
    }
}

function handleToggleDropdownMenu(event) {
    const menuButton = event.target.closest('[data-role="menuButton"]')
    const isClickInsideMenu = dropDownMenu.contains(event.target)
    if (menuButton) {
        event.stopPropagation()
        dropDownMenu.classList.toggle('hidden')
        return
    }
    if (!isClickInsideMenu) {
        dropDownMenu.classList.add('hidden')
    }
}

function handleClickButtonAddTodo() {
    buildFormModal()
    toggleModal(formModalElement)
}

async function handleClickEditTodo({ target }) {
    if (target.dataset.role !== 'edit') return

    const { id } = target.closest('[data-id]').dataset
    const currentTodo = todos.find(todo => todo.id == id)

    toggleModal(formModalElement)
    await buildFormModal(currentTodo)

    const titleInput = formElement.querySelector('input[name="title"]')
    const descriptionInput = formElement.querySelector('textarea[name="description"]')
    const userSelect = formElement.querySelector('select[name="assignUser"]')
    const cardBgColor = form.querySelector('#selectedColorPreview')

    titleInput.value = currentTodo.title
    descriptionInput.value = currentTodo.description
    userSelect.value = currentTodo.assignUser
    cardBgColor.classList.add(`bg-${currentTodo.color}`)

    formElement.dataset.editedId = currentTodo.id
}

function handleSubmitForm(event) {
    event.preventDefault()
    const formDataObject = Object.fromEntries(new FormData(event.target))
    const { editedId } = formElement.dataset

    if (editedId) {
        const editedTodoIndex = todos.findIndex(todo => todo.id == editedId)
        todos[editedTodoIndex] = { ...todos[editedTodoIndex], ...formDataObject }
    } else {
        todos.push(new Todo(formDataObject))
    }

    setDataToStorage(todos)
    render(todos)
    formElement.reset()
    toggleModal(formModalElement)
    delete formElement.dataset.editedId;
}

function handleClickButtonDeleteAll() {
    const hasDoneTask = todos.some((todo) => todo.status == 'done')
    if (!hasDoneTask) return

    toggleModal(deleteAllModalElement)

    confirmBtn.addEventListener('click', handleClickConfirmDeleteAll);
    cancelBtn.addEventListener('click', handleClickConfirmDeleteAll);
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

function handleChangeSelect({ target }) {
    const newStatus = target.value
    const closestElement = target.closest('[data-id]')

    if (!closestElement) return

    const { id } = closestElement.dataset

    const progressCards = todos.filter((todo) => todo.status == 'progress').length

    if ((newStatus == 'progress') && progressCards >= 6) {
        toggleModal(progressLimitModalElement)

        const currentTodo = todos.find(todo => todo.id == id)
        target.value = currentTodo.status

        return
    }

    if (closestElement) {
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
    handleToggleDropdownMenu,
    handleSubmitForm,
    handleClickButtonAddTodo,
    handleClickButtonDeleteAll,
    handleClickConfirmDeleteAll,
    handleClickEditTodo,
    handleClickCloseModal,
    handleChangeSelect,
    handleDeleteCard
}