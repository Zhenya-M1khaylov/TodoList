import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Components/Task';

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        changeTaskStatus: action('ChangeTaskStatus'),
        changeTaskTitle: action('ChangeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: 'todolistId'
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    task: {id: 'id', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStories = Template.bind({});

TaskIsNotDoneStories.args = {
    task: {id: 'id1', isDone: false, title: 'HTML'},
};

