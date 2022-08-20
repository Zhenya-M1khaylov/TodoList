import React, {ChangeEvent} from 'react';
import {AddItemForm} from '../src/Components/AddItemForm';
import {EditableSpan} from '../src/Components/EditableSpan';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {addTaskAC, changeTaskStatusAC, changeTitleStatusAC, removeTaskAC} from './state/tasks-reducer';
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistDomainType} from './state/todolists-reducer';
import {TaskStatuses} from './api/ todolist-api';

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
}

type PropsType = {
    todolist: TodolistDomainType
}

export function TodolistWithTasks({todolist}: PropsType) {

    const {id, title, filter} = {...todolist}
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    const dispatch = useDispatch()
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }

    const removeTodolist = () => {
        let action = removeTodolistAC(todolist.id)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }

    const onAllClickHandler = () => dispatch(changeFilterAC(todolist.id, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterAC(todolist.id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(todolist.id, 'completed'));

    return <div>
        <h3> <EditableSpan value={todolist.title} onChange={changeTodolistTitle} />
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolist.id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTitleStatusAC(t.id, newValue, todolist.id))
                    }

                    return <li key={t.id} className={t.status ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.status === TaskStatuses.Completed}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={todolist.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={todolist.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={todolist.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


