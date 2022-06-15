import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Components/Task';
import {TaskType} from '../Todolist';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
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


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskWithLocalState> = (args) => <TaskWithLocalState />;


export const TaskWithLocalStateStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskWithLocalStateStories.args = {
    task: {id: 'id1', isDone: false, title: 'HTML'},
};

