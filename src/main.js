import './style.css'
import { formElement, buttonAddTodoElement, cruidModalElement } from './modules/variables.js'
import { handleClickButtonAddTodo, handleClickCloseModal, handleSubmitForm } from './modules/handlers.js'

formElement.addEventListener('submit', handleSubmitForm)

buttonAddTodoElement.addEventListener('click', handleClickButtonAddTodo)

cruidModalElement.addEventListener('click', handleClickCloseModal)