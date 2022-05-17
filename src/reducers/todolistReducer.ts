import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';

export const todolistsReducer = (state: Array<TodolistsType>, action: todolistsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case 'ADD-TODOLIST': {

            let newTodolist: TodolistsType = {id: action.payload.id, title: action.payload.title, filter: 'all'};

            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

type todolistsReducerType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId1
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (id: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {id, title}
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId2, newTodolistTitle
        }

    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id, filter
        }
    } as const
}