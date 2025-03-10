import './style.css'
import {
    todos,
    containerTodoElement,
    formElement,
    deleteAllButtonElement,
    buttonAddTodoElement,
    formModalElement,
    deleteAllModalElement,
    progressLimitModalElement
} from './modules/variables.js'
import {
    handleClickButtonDeleteAll,
    handleClickButtonAddTodo,
    handleClickCloseModal,
    handleSubmitForm,
    handleChangeSelect,
    handleDeleteCard
} from './modules/handlers.js'
import {
    render,
    countTodosInColumn,

} from './modules/helpers.js';

formElement.addEventListener('submit', handleSubmitForm)
buttonAddTodoElement.addEventListener('click', handleClickButtonAddTodo)
deleteAllButtonElement.addEventListener('click', handleClickButtonDeleteAll)
//
// formModalElement.addEventListener('click', handleClickCloseModal)
// deleteAllModalElement.addEventListener('click', handleClickCloseModal)
// progressLimitModalElement.addEventListener('click', handleClickCloseModal)
//
containerTodoElement.addEventListener('click', handleClickCloseModal)
containerTodoElement.addEventListener('click', handleDeleteCard)
containerTodoElement.addEventListener('change', handleChangeSelect)

render(todos)
countTodosInColumn(todos)