import { statusArr } from './variables.js'

class Todo {
    id = crypto.randomUUID()
    createdAt = new Date().toString()
    constructor({ title, description, assignUser, status = '0' }) {
        this.title = title
        this.description = description
        this.assignUser = assignUser
        this.status = statusArr[status]
    }
}

export { Todo }