import './style.css'
import {
    todos,
    containerTodoElement,
    formElement,
    deleteAllButtonElement,
    buttonAddTodoElement,
} from './modules/variables.js'
import {
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

render(todos)