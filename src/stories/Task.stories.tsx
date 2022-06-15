import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from '../Components/Task';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStories.args = {
    task: {id: 'id', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStories.args = {
    task: {id: 'id1', isDone: false, title: 'HTML'},
};

