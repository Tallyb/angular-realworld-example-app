import { type Locator, test as base } from '@playwright/test';

type SBFixtures = {
  getComponent: (component: Locator) => Promise<any>;
};

export const test = base.extend<SBFixtures >({

getComponent: async ({}, use) => {
  async function getComponentHelper(component: Locator): Promise<any> {
    await component.waitFor({ state: 'attached' });
    const ngCmp = await component.evaluate((c) => {
      const comp = window['ng'].getComponent(c);
      return comp;
    });
    return ngCmp;
  }

  await use(getComponentHelper);
}
});




export { expect } from '@playwright/test';