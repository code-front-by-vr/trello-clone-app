import { cruidModalElement } from './variables.js'

function buildTemplateTodo({ title, description, assignUser, createdAt, status }) {
    const data = prepareDate(createdAt)
    return `
        <div class="card bg-white rounded-lg">
            <div class="flex py-4 justify-around" role="group">
                <button type="button" class="card-btn">Edit</button>
                <select id="status" class="select-status">
                    <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="in-progress" ${status == 'in-progress' ? 'selected' : ''}>In progress</option>
                    <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button type="button" class="card-btn">Delete</button>
            </div>
            <div class="card-body w-full px-4 mb-2">
                <h3 class="card-title mb-2 text-lg text-gray-800">${title}</h3>
                <div class="card-description text-base text-gray-800">${description}</div>
            </div>
            <div class="card-footer p-4 flex justify-between text-base text-gray-800">
                <div class="card-assign-user">${assignUser}</div>
                <div class="card-created-at">${data}</div>
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

function render(todos = [], { status }) {
    const targetColumn = document.querySelector(`#${status}`)
    targetColumn.innerHTML = ''
    const html = todos.reduce((acc, todo) => acc + buildTemplateTodo(todo), '')
    targetColumn.innerHTML = html
}

export { buildTemplateTodo, prepareDate, toggleModal, render }