import { HttpClientModule } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { applicationConfig, type Preview } from "@storybook/angular";

const decorators = [
  applicationConfig({
    providers: [
      importProvidersFrom(HttpClientModule),
      importProvidersFrom(RouterTestingModule),
    ],

  })
];
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators
};

export default preview;
