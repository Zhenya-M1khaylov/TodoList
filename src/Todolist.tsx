import React, {ChangeEvent} from 'react';
import {FilterValuesType, TodolistsType} from './App';
import {FullInput} from './Components/FullInput';
import {EditableSpan} from './Components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox, IconButton} from '@mui/material';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    // changeFilter: (todolistID:string,value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    setTodolists: (todolists: Array<TodolistsType>) => void
    todolists: Array<TodolistsType>
    removeTodolist: (todolistID: string) => void
    editTodolist: (todolistId: string, newTitle: string)=> void
    editTask: (todolistId: string, taskID: string, newTitle: string)=> void
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState('')
    // let [error, setError] = useState<string | null>(null)


    function changeFilter(todolistID: string, value: FilterValuesType) {
        props.setTodolists(props.todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }


    let tasksForTodolist = props.tasks;
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }


    // const addTask = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(props.todolistID, title.trim());
    //         setTitle('');
    //     } else {
    //         setError('Title is required');
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => changeFilter(props.todolistID, 'all');
    const onActiveClickHandler = () => changeFilter(props.todolistID, 'active');
    const onCompletedClickHandler = () => changeFilter(props.todolistID, 'completed');

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.id, newTitle)
    }

    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }

    const editTaskHandler = (tID: string, newTitle: string) => {
        props.editTask(props.id, tID, newTitle)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            {/*{props.title}*/}
            <IconButton aria-label="delete">
                <Delete onClick={removeTodolistHandler}/>
            </IconButton>
            {/*<button onClick={removeTodolistHandler}>x</button>*/}
        </h3>
        <FullInput callBack={addTaskHandler} />
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? 'error' : ''}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>

            {tasksForTodolist.map(t => {
                const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                }

                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    {/*<input type="checkbox"*/}
                    {/*       onChange={onChangeHandler}*/}
                    {/*       checked={t.isDone}/>*/}
                    <Checkbox defaultChecked onChange={onChangeHandler} checked={t.isDone} />
                    <EditableSpan title={t.title} callBack={(newTitle)=>editTaskHandler(t.id, newTitle)}/>
                    <IconButton aria-label="delete">
                        <Delete onClick={onClickHandler}/>
                    </IconButton>
                    {/*<button onClick={onClickHandler}>x</button>*/}
                </li>
            })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success"  onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary" onClick={onCompletedClickHandler}>Completed</Button>

            {/*<button className={props.filter === 'all' ? 'active-filter' : ''}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? 'active-filter' : ''}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? 'active-filter' : ''}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
        </div>
    </div>
}
