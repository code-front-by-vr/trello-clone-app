import { cruidModalElement, todoContainerElement, inProgressContainerElement, doneContainerElement } from './variables.js'

function buildTemplateTodo({ id, title, description, assignUser, createdAt, status }) {
    const data = prepareDate(createdAt)
    return `
        <div data-id="${id}" class="card bg-white rounded-lg">
            <div class="flex py-4 justify-around" role="group">
                <button type="button" class="card-btn">Edit</button>
                <select name="status" class="select-status">
                    <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="in-progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
                    <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button type="button" class="card-btn" data-role="remove">Delete</button>
            </div>
            <div class="w-full px-4 mb-2">
                <h3 class="mb-2 text-lg text-gray-800">${title}</h3>
                <div class="text-base text-gray-800">${description}</div>
            </div>
            <div class="p-4 flex justify-between text-base text-gray-800">
                <div>${assignUser}</div>
                <div>${data}</div>
            </div>
        </div>
    `
}

function prepareDate(date = '') {
    const dateInstance = new Date(date)
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    return new Intl.DateTimeFormat('ru-RU', options).format(dateInstance)
}

function toggleModal() {
    if (cruidModalElement.classList.contains('hidden')) {
        cruidModalElement.classList.replace('hidden', 'flex')
    } else {
        cruidModalElement.classList.replace('flex', 'hidden')
    }
}

function render(todos = []) {
    todoContainerElement.innerHTML = ''
    inProgressContainerElement.innerHTML = ''
    doneContainerElement.innerHTML = ''
    todos.forEach((todo) => {
        const targetColumn = document.querySelector(`#${todo.status}`)
        targetColumn.insertAdjacentHTML('beforeend', buildTemplateTodo(todo))
    })
}

export { buildTemplateTodo, prepareDate, toggleModal, render }