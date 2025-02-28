import './style.css'
import { todos, containerTodoElement, formElement, buttonAddTodoElement, cruidModalElement } from './modules/variables.js'
import { handleClickButtonAddTodo, handleClickCloseModal, handleSubmitForm, handleDeleteCard } from './modules/handlers.js'
import { render } from './modules/helpers.js';

formElement.addEventListener('submit', handleSubmitForm)
buttonAddTodoElement.addEventListener('click', handleClickButtonAddTodo)
cruidModalElement.addEventListener('click', handleClickCloseModal)
containerTodoElement.addEventListener('click', handleDeleteCard)

render(todos)