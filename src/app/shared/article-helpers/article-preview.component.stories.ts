import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ArticlePreviewComponent  } from './article-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleMetaComponent } from './article-meta.component';
import { FavoriteButtonComponent } from '../buttons/favorite-button.component';

const meta: Meta<ArticlePreviewComponent> = {
  title: 'Example/ArticlePreviewComponent',
  component: ArticlePreviewComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [ ArticleMetaComponent, FavoriteButtonComponent  ],
      imports: [CommonModule, ReactiveFormsModule, ],
    }),
  ],
  render: (args: ArticlePreviewComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },

  }),
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<ArticlePreviewComponent>;

export const Primary: Story = {
  args: {
    article: {
      slug: 'testBash',
      title: 'Demo for Test Bash',
      description: 'Showing a story for a component',
      body: '',
      tagList: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: { username: 'mot', bio: '', image: 'https://do3z7e6uuakno.cloudfront.net/uploads/event/logo/1123649/23121ae2e9afa644d6a4a1b4e4bea1d1.png', following: false },
      favorited: false,
      favoritesCount: 200,
    }
  },
};

