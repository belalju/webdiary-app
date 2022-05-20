import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CategoryComponent } from "./components/category/category.component";
import { NoteComponent } from "./components/note/note.component";
import { FilterPipe } from "./components/notes/filter.pipe";
import { NotesComponent } from "./components/notes/notes.component";
import { NotesRoutingModule } from "./notes.routing";
import { CategoryService } from "./services/category.service";
import { NoteService } from "./services/note.service";

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
        NoteService
    ],
    declarations: [
        CategoryComponent,
        NotesComponent,
        NoteComponent,
        FilterPipe
    ],
    exports: [],
})
export class NotesModule {}