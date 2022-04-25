import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }


    const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        let tasksForRender;
        switch (filter) {
            case 'completed':
                tasksForRender = tasks.filter(t => t.isDone === true)
                break
            case 'active':
                tasksForRender = tasks.filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks;
        }
        return tasksForRender
    }


    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)

    const tasksListItems = tasksForRender.length
        ? tasksForRender.map(t => {
            const onClickButtonRemoveTask = () => props.removeTask(t.id)
            const onChangeChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            const taskClasses = t.isDone ? 'is-done' : '';
            return (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeChangeStatus}
                    />
                    <span className={taskClasses}>{t.title}</span>
                    <button onClick={onClickButtonRemoveTask}>x</button>
                </li>
            )
        })
        : <span>ERROR</span>


    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const inputClasses = error ? 'error' : ''


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onChange={onChangeSetTitle}
                        onKeyPress={onKeyPressAddTask}
                        className={inputClasses}
                    />
                    <button onClick={onClickAddTask}>+</button>
                    {error && <div className={'error-message'}>Title is required!</div>}
                </div>
                <ul>
                    {tasksListItems}
                </ul>
                <div>
                    <button
                        className={allBtnClasses}
                        onClick={changeFilter('all')}>All
                    </button>
                    <button
                        className={activeBtnClasses}
                        onClick={changeFilter('active')}>Active
                    </button>
                    <button
                        className={completedBtnClasses}
                        onClick={changeFilter('completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;