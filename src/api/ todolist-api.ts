import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2166576b-0034-4414-afd9-6b9f223707f5'
    }
})


export const todoListAPI = {
    updateTodolist: (todolistId: string, title: string) => {
        const promise = instance.put<BaseTodolistType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    createTodolist: (title: string) => {
        return instance.post<BaseTodolistType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseTodolistType>(`todo-lists/${todolistId}`)
    },
    getTodolist: () => {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type BaseTodolistType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

