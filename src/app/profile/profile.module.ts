import { NgModule } from '@angular/core';

import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileComponent } from './profile.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    imports: [
    ProfileRoutingModule,
    ProfileArticlesComponent,
    ProfileComponent,
    ProfileFavoritesComponent
],
    providers: []
})
export class ProfileModule {}
