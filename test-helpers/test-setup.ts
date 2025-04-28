import '@analogjs/vitest-angular/setup-snapshots';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

// Create a custom testing module to provide zoneless change detection
import { NgModule } from '@angular/core';


process.env.TZ = 'UTC';
process.env.LANG = 'en_US';

@NgModule({
  providers: [provideExperimentalZonelessChangeDetection()],
})
class ZonelessTestModule {}

getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZonelessTestModule],
  platformBrowserDynamicTesting()
);
