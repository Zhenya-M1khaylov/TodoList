import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Components/Task';
import {TaskType} from '../Todolist';


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
    let [task, setTask] = useState<TaskType>({id: 'id', title: "JS", isDone: false})

    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }
    const changeTaskTitle = (taskID: string, title: string) => setTask({...task, title})

    return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={action('removeTask')} task={task} todolistId={'id123'}/>
}


const Template: ComponentStory<typeof TaskWithLocalState> = (args) => <TaskWithLocalState />;


export const TaskWithLocalStateStories = Template.bind({});

TaskWithLocalStateStories.args = {
    task: {id: 'id1', isDone: false, title: 'HTML'},
};

