import './style.css'
import {
    todos,
    containerTodoElement,
    deleteAllButtonElement,
    buttonAddTodoElement,
} from './modules/variables.js'
import {
    handleToggleDropdownMenu,
    handleClickButtonDeleteAll,
    handleClickButtonAddTodo,
    handleClickEditTodo,
    handleClickCloseModal,
    handleSubmitForm,
    handleChangeSelect,
    handleDeleteCard
} from './modules/handlers.js'
import {
    render
} from './modules/helpers.js';

buttonAddTodoElement.addEventListener('click', handleClickButtonAddTodo)
deleteAllButtonElement.addEventListener('click', handleClickButtonDeleteAll)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickCloseModal)
containerTodoElement.addEventListener('click', handleDeleteCard)
containerTodoElement.addEventListener('change', handleChangeSelect)
containerTodoElement.addEventListener('click', handleClickEditTodo)
document.addEventListener('click', handleToggleDropdownMenu)

render(todos)