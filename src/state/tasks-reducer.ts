import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/ todolist-api';


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleActionType = ReturnType<typeof changeTitleStatusAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), status: TaskStatuses.New, todoListId: action.todolistId , startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low, title: action.title}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=>t.id === action.taskID ? {...t, status: action.status}: t)
            }
        case 'CHANGE-TITLE-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t=>t.id === action.taskID ? {...t, title: action.title}: t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            // let {[action.payload.todolistId]:[], ...rest}= {...state}
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, status, todolistId} as const
}
export const changeTitleStatusAC = (taskID: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE-STATUS', taskID, title, todolistId} as const
}


