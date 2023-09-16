import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('iframe.html?args=&id=example-editorcomponent--primary');
  const title = page.getByPlaceholder('Article Title');
  await title.click();
  await title.fill('This is a title');
  const description = page.getByPlaceholder('What\'s this article about?');
  await description.click();
  await description.fill('Description');
  const tags = page.getByPlaceholder('Enter tags');
  await tags.click();
  await tags.fill('tag1 tag2');
  const markdown = page.getByPlaceholder('Write your article (in markdown)');
  await markdown.click();
  await markdown.fill('Write some content here');
  await page.getByRole('button', { name: 'Publish Article' }).click();
});