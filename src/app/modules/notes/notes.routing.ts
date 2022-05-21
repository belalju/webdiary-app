import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NotesComponent } from "./components/notes/notes.component";
import { RegisterComponent } from "./components/register/register.component";

export const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'notes',
      component: NotesComponent
    }

];

@NgModule({
imports: [ RouterModule.forChild(routes) ],
exports: [ RouterModule ]
})
export class NotesRoutingModule {}