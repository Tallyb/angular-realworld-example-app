import { test, expect } from '../../test-helpers/fixtures';

test('Article component', async ({ page, getComponent }) => {
  await page.goto('iframe.html?args=&id=example-articlepreviewcomponent--primary');
  const component = page.locator('app-article-preview');
  await component.waitFor({ state: 'attached' });
  const ngCmp = await getComponent(component);
  expect(ngCmp.article).toBeTruthy();
  console.log(ngCmp.article);
});

export { expect } from '@playwright/test';