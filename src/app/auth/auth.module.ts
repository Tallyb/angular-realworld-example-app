import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    imports: [
    AuthRoutingModule,
    AuthComponent
],
    providers: [
        NoAuthGuard
    ]
})
export class AuthModule {}
