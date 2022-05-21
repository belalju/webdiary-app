import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component";
import { LoginComponent } from "./components/login/login.component";
import { NoteComponent } from "./components/note/note.component";
import { NotesComponent } from "./components/notes/notes.component";
import { SearchFilterPipe } from "./components/notes/search-filter.pipe";
import { RegisterComponent } from "./components/register/register.component";
import { NotesRoutingModule } from "./notes.routing";
import { AuthService } from "./services/auth.service";
import { CategoryService } from "./services/category.service";
import { NoteService } from "./services/note.service";
import { TokenStorageService } from "./services/token-storage.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NotesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        CategoryService,
        NoteService,
        AuthService,
        TokenStorageService
    ],
    declarations: [
        CategoryComponent,
        NotesComponent,
        NoteComponent,
        SearchFilterPipe,
        LoginComponent,
        RegisterComponent
    ],
    exports: [],
})
export class NotesModule {}