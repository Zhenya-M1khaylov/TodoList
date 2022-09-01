import {TaskActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import {appReducer} from './app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

type AppDispatchType = TodolistActionsType | TaskActionsType

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppDispatchType>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
