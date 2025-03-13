import {
    clockElement,
    todoContainerElement,
    inProgressContainerElement,
    doneContainerElement,
    todoCountElement,
    inProgressCountElement,
    doneCountElement,
    formElement,
} from './variables.js'

function buildTemplateTodo({ id, title, description, assignUser, createdAt, status }) {
    const data = prepareDate(createdAt)
    return `
        <div data-id="${id}" class="card bg-white rounded-2xl shadow-lg p-5 w-full max-w-md border border-gray-200 overflow-hidden">
            <div class="flex mb-4 justify-center" role="group">
                <button type="button" class="card-btns_edit" data-role="edit">Edit</button>
                <select name="status" class="card-btns_select">
                    <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
                    <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button type="button" class="card-btns_delete" data-role="remove">Delete</button>
            </div>
            <div class="mb-4">
                <h3 class="text-xl font-semibold text-gray-900 truncate">${title}</h3>
                <div class="text-gray-600 break-words max-w-full overflow-hidden">${description}</div>
            </div>
            <div class="flex justify-between text-gray-500 text-sm border-t pt-3">
                <div class="flex items-center gap-2">
                    <span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-lg">${assignUser}</span>
                </div>
                <div class="text-gray-400">${data}</div>
            </div>
        </div>
    `
}

async function buildFormModal(todo = null) {
    formElement.innerHTML = `
            <div class="mb-6 flex flex-col gap-4">
                <div>
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
                <div>
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
                <div>
                    <label for="assignUser" class="mb-2 block text-sm font-medium text-gray-900"
                        >User</label
                    >
                    <select
                        name="assignUser"
                        id="assignUser"
                        class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                        required
                    >
                        <option selected value="">Choose assign user</option>
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
                ${todo ? 'Save Changes' : 'Add todo'}
            </button>
    `
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/?_limit=5')
        const users = await response.json()
        const selectUsers = document.querySelector('#assignUser')

        users.forEach((user) => {
            const optionUser = document.createElement('option')
            optionUser.value = user.username
            optionUser.textContent = user.username
            selectUsers.append(optionUser)
        })

    } catch (error) {
        alert('Что-то пошло не так. Попробуйте еще раз', error)
    }
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