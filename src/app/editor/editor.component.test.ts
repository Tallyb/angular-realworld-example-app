import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?args=&id=example-editorcomponent--primary');
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill('This is a title');
  await page.getByPlaceholder('What\'s this article about?').click();
  await page.getByPlaceholder('What\'s this article about?').fill('Description');
  await page.getByPlaceholder('Enter tags').click();
  await page.getByPlaceholder('Enter tags').fill('tag1 tag2');
  await page.getByPlaceholder('Write your article (in markdown)').click();
  await page.getByPlaceholder('Write your article (in markdown)').fill('Write some content here');
  await page.getByRole('button', { name: 'Publish Article' }).click();
});