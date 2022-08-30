import {TasksActionType, tasksReducer} from './tasks-reducer';
import {TodolistActionType, todolistsReducer} from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {TypedUseSelectorHook} from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

type DispatchType = TasksActionType | TodolistActionType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, DispatchType>


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
