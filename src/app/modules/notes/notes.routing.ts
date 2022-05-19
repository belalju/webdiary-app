import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotesComponent } from "./components/notes/notes.component";

export const routes: Routes = [
    {
      path: '',
      component: NotesComponent
    },

];

@NgModule({
imports: [ RouterModule.forChild(routes) ],
exports: [ RouterModule ]
})
export class NotesRoutingModule {}