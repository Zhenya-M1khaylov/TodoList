import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Components/Task'
import { TaskPriorities } from '../api/todolist-api';

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export default {
    title: 'TODOLISTS/TaskWithLocalState',
    component: Task,
    args: {
        changeTaskStatus: action('ChangeTaskStatus'),
        changeTaskTitle: action('ChangeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: 'todolistId'
    }
} as ComponentMeta<typeof Task>;

const TaskWithLocalState = () => {
    let [task, setTask] = useState<TaskType>({id: 'id', title: "JS", status: TaskStatuses.New, todoListId: 'todolistId', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low})

    const changeTaskStatus = () => {
        setTask({...task, status: TaskStatuses.Completed})
        // setTask({...task, status: !task.status}) // тут поменять на противоположное значение
    }
    const changeTaskTitle = (taskID: string, title: string) => setTask({...task, title})

    return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('removeTask')} task={task} todolistId={'id123'}/>
}


const Template: ComponentStory<typeof TaskWithLocalState> = (args) => <TaskWithLocalState />;


export const TaskWithLocalStateStories = Template.bind({});

TaskWithLocalStateStories.args = {
    task: {id: 'id1', status: TaskStatuses.New, todoListId: 'todolistId', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low, title: 'HTML'},
};

