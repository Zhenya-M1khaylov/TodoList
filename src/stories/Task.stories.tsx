import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Components/Task';
import {TaskPriorities, TaskStatuses} from '../api/ todolist-api';

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
    task: {id: 'id', status: TaskStatuses.Completed, todoListId: 'todolistId', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low, title: 'JS'},
};

export const TaskIsNotDoneStories = Template.bind({});

TaskIsNotDoneStories.args = {
    task: {id: 'id1', status: TaskStatuses.New, todoListId: 'todolistId', startDate: '', order: 0, addedDate: '', description: '', deadline: '', priority: TaskPriorities.Low, title: 'HTML'},
};

