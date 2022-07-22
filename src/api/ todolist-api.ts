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

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseTodolistType<T={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}



