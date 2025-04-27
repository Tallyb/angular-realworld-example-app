import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { EditorComponent  } from './editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

export const Primary: Story = {
  args: {
  },
};

