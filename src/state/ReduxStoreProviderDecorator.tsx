import {ReactNode} from 'react';
import {Provider} from 'react-redux';
import React from 'react'
import {combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: ()=> ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

// export const ReduxStoreProviderDecorator = (storeFn: () => ReactNode) => <Provider store={store}>{storeFn()}</Provider>