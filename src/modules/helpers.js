import {
    clockElement,
    todoContainerElement,
    inProgressContainerElement,
    doneContainerElement,
    todoCountElement,
    inProgressCountElement,
    doneCountElement,
} from './variables.js'

function buildTemplateTodo({ id, title, description, assignUser, createdAt, status }) {
    const data = prepareDate(createdAt)
    return `
        <div data-id="${id}" class="card bg-white rounded-lg">
            <div class="flex py-4 justify-center" role="group">
                <button type="button" class="card-btns_edit" data-role="edit">Edit</button>
                <select name="status" class="card-btns_select">
                    <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
                    <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button type="button" class="card-btns_delete" data-role="remove">Delete</button>
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

function buildFormModal() {
    return `
            <div class="mb-6 flex flex-col gap-4">
                <div class="">
                    <label for="title" class="mb-2 block text-sm font-medium text-gray-900"
                        >Title</label
                    >
                    <input
                        type="text"
                        name="title"
                        id="title"
                        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        placeholder="Enter todo..."
                        required=""
                    />
                </div>
                <div class="">
                    <label for="description" class="mb-2 block text-sm font-medium text-gray-900"
                        >Description</label
                    >
                    <textarea
                        name="description"
                        id="description"
                        rows="4"
                        class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Write description here"
                        required
                    ></textarea>
                </div>
                <div class="">
                    <label for="assign-user" class="mb-2 block text-sm font-medium text-gray-900"
                        >User</label
                    >
                    <select
                        name="assignUser"
                        id="assign-user"
                        class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        required
                    >
                        <option selected value="">Choose assign user</option>
                        <option value="Adam">Adam</option>
                        <option value="Jane">Jane</option>
                        <option value="Kate">Kate</option>
                        <option value="Mike">Mike</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="submit-form-btn">
                <svg
                class="-ms-1 me-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                ></path>
                </svg>
                Add todo
            </button>
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

function toggleModal(modalElement) {
    if (modalElement.classList.contains('hidden')) {
        modalElement.classList.replace('hidden', 'flex')
    } else {
        modalElement.classList.replace('flex', 'hidden')
    }
}

function countTodosInColumn(todos) {
    const todoCountArr = todos.filter((todo) => todo.status == 'todo')
    todoCountElement.textContent = todoCountArr.length
    const inProgressArr = todos.filter((todo) => todo.status == 'progress')
    inProgressCountElement.textContent = inProgressArr.length
    const doneCountArr = todos.filter((todo) => todo.status == 'done')
    doneCountElement.textContent = doneCountArr.length
}

function render(todos = []) {
    todoContainerElement.innerHTML = ''
    inProgressContainerElement.innerHTML = ''
    doneContainerElement.innerHTML = ''
    todos.forEach((todo) => {
        const targetColumn = document.querySelector(`#${todo.status}`)
        targetColumn.insertAdjacentHTML('beforeend', buildTemplateTodo(todo))
    })
    countTodosInColumn(todos)
    displayClock()
}
function displayClock() {
    clockElement.textContent = new Date().toLocaleTimeString()
    setInterval(displayClock, 1000)
}
export {
    buildTemplateTodo,
    prepareDate,
    toggleModal,
    render,
    countTodosInColumn,
    buildFormModal
}