import {
    clockElement,
    columns,
    countCards,
    formElement,
} from './variables.js'

// Create todo card
function buildTemplateTodo({ id, title, description, assignUser, createdAt, status, color }) {
    const data = prepareDate(createdAt)
    return `
        <div data-id="${id}" class="card bg-${color} rounded-2xl shadow-lg p-5 w-full max-w-md border border-gray-200 overflow-hidden">
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

// Create form 
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
                        class="form-title"
                        placeholder="Enter todo..."
                        required
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
                        class="form-description"
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
                        class="form-assign-user"
                        required
                    >
                        <option selected value="">Choose assign user</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-gray-900">Choose Color</label>
                    <div class="relative">
                        <button id="colorDropdownBtn" type="button" class="dropdown-color-btn">
                            <span id="selectedColorPreview" class="w-full h-full inline-flex"></span>
                        </button>
                        <div id="colorDropdown" class="dropdown-color hidden">
                            <div class="grid grid-cols-4 gap-1">
                                <button type="button" class="color-btn bg-white" data-color="white"></button>
                                <button type="button" class="color-btn bg-amber-100" data-color="amber-100"></button>
                                <button type="button" class="color-btn bg-orange-100" data-color="orange-100"></button>
                                <button type="button" class="color-btn bg-red-100" data-color="red-100"></button>
                                <button type="button" class="color-btn bg-rose-100" data-color="rose-100"></button>
                                <button type="button" class="color-btn bg-sky-100" data-color="sky-100"></button>
                                <button type="button" class="color-btn bg-slate-100" data-color="slate-100"></button>
                                <button type="button" class="color-btn bg-lime-100" data-color="lime-100"></button>
                            </div>
                        </div>
                        <input type="hidden" name="color" id="selectedColor" value="white">
                    </div>
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
    await loadUsers()
    initColorPicker(formElement)
}

// load users from server
async function loadUsers() {
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

// Make color palette for form
function initColorPicker(form) {
    const dropdownBtn = form.querySelector('#colorDropdownBtn')
    const colorPreview = form.querySelector('#selectedColorPreview')
    const dropdown = form.querySelector('#colorDropdown')
    const colorBtns = form.querySelectorAll('.color-btn')
    const hiddenInput = form.querySelector('#selectedColor')

    dropdownBtn.addEventListener('click', () => dropdown.classList.toggle('hidden'))

    colorBtns.forEach((btn) => {
        btn.addEventListener('click', ({ target }) => {
            const selectedColor = target.dataset.color
            //reset classes to initial ones
            colorPreview.className = 'w-full h-full inline-flex'
            colorPreview.classList.add(`bg-${selectedColor}`)
            hiddenInput.value = selectedColor
            dropdown.classList.add('hidden')
        })
    })
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
// Display or hide current modal
function toggleModal(modalElement) {
    modalElement.classList.contains('hidden') ? modalElement.classList.replace('hidden', 'flex') : modalElement.classList.replace('flex', 'hidden')
}

function render(todos = []) {
    columns.forEach((column) => column.innerHTML = '')
    todos.forEach((todo) => {
        const targetColumn = document.querySelector(`#${todo.status}`)
        targetColumn.insertAdjacentHTML('beforeend', buildTemplateTodo(todo))
    })
    updateCardsCounter(todos)
    displayClock()
}
// Calculate amount of cards in each column
function updateCardsCounter(todos) {
    const counts = { todo: 0, progress: 0, done: 0 }
    todos.forEach((todo) => counts[todo.status]++)
    countCards.forEach((counter, index) => {
        counter.textContent = Object.values(counts)[index]
    })
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
    buildFormModal
}