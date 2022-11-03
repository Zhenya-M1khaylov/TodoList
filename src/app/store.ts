import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import {appReducer, setAppErrorAC} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

type AppDispatchType = TodolistActionsType | TasksActionsType | ReturnType<typeof setAppErrorAC >

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppDispatchType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
