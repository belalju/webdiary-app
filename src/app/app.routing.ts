import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Import Containers

export const routes: Routes = [
    // {
    //     path: '',
    //     component: AppComponent
    //   },
      {
        path: '',
        loadChildren: () => import('./modules/notes/notes.module').then(m => m.NotesModule)
      } 
      
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
