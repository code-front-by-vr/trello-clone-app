import './style.css'
import { todos, containerTodoElement, formElement, buttonAddTodoElement, formModalElement } from './modules/variables.js'
import { handleClickButtonAddTodo, handleClickCloseModal, handleSubmitForm, handleChangeSelect, handleDeleteCard } from './modules/handlers.js'
import { render, countTodosInColumn } from './modules/helpers.js';

formElement.addEventListener('submit', handleSubmitForm)
buttonAddTodoElement.addEventListener('click', handleClickButtonAddTodo)
formModalElement.addEventListener('click', handleClickCloseModal)
containerTodoElement.addEventListener('click', handleDeleteCard)
containerTodoElement.addEventListener('change', handleChangeSelect)

render(todos)
countTodosInColumn(todos)