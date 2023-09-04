import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { EditorComponent  } from './editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Article, ArticlesService } from '../core';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<EditorComponent> = {
  title: 'Example/EditorComponent',
  component: EditorComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [  ],
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  render: (args: EditorComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },

  }),
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<EditorComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Primary: Story = {
  args: {
  },
};

