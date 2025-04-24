import { NgModule } from '@angular/core';


import { EditorComponent } from './editor.component';


import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
    imports: [EditorRoutingModule, EditorComponent],
    providers: []
})
export class EditorModule {}
