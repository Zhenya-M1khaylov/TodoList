import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from '../Components/EditableSpan';

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'value EditableSpan changed'
        },
        value: {
            defaultValue: 'DoubleClick Me!',
            description: 'Start value EditableSpan'
        }
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});

EditableSpanStories.args = {
    onChange: action('value EditableSpan changed')
};

