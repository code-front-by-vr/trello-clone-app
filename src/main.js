import './style.css'
import {
    containerTodoElement,
    deleteAllButtonElement,
    buttonAddTodoElement,
    dropDownMenuButton,
} from './modules/variables.js'
import {
    handleToggleDropdownMenu,
    handleCloseDropdownMenu,
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
dropDownMenuButton.addEventListener('click', handleToggleDropdownMenu)
document.addEventListener('click', handleCloseDropdownMenu)

render()