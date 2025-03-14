import { statusArr } from './variables.js'

class Todo {
    id = Date.now()
    createdAt = new Date().toString()
    constructor({ title, description, assignUser, status = '0', color }) {
        this.title = title
        this.description = description
        this.assignUser = assignUser
        this.status = statusArr[status]
        this.color = color
    }
}

export { Todo }