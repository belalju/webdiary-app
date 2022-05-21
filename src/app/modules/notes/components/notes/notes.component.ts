import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { CategoryModel } from "../../models/category.model";
import { NoteModel } from "../../models/note.model";
import { CategoryService } from "../../services/category.service";
import { NoteService } from "../../services/note.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { CategoryComponent } from "../category/category.component";
import { NoteComponent } from "../note/note.component";

@Component({
    templateUrl: 'notes.component.html'
})

export class NotesComponent implements OnInit {

    title = 'Welcome Back';
    userName: string = '';
    noteModel: NoteModel;
    noteModelList: NoteModel[] = [];
    search: string ='';
    categoryId: number = 0;
    categoryList: CategoryModel[] = [];

    constructor(
        private modalService: NgbModal, 
        private noteService: NoteService,
        private categoryService: CategoryService,
        private toastr: ToastrService,
        private tokenStorageService: TokenStorageService
    ){}

    ngOnInit() {
        this.getNoteList();
        this.getCategoryList();
        this.userName = this.tokenStorageService.getUsername();
    }

    getNoteList(){
        this.noteService.getList().subscribe(response => 
        {
            this.noteModelList = response;
        });
    }

    getCategoryList(){
      this.categoryService.getActiveList().subscribe(response => 
        {
          this.categoryList = response;
        });
    }

    getNoteListByCategory(categoryId: number){
      this.noteService.getByCategory(categoryId).subscribe(response => 
      {
          this.noteModelList = response;
      });
  }

    open() {
        const modalRef = this.modalService.open(CategoryComponent, { size: 'lg' });
    }

    openNote() {
        const modalRef = this.modalService.open(NoteComponent, { size: 'lg' });
        modalRef.result.then(res=>{
          console.log("CloseButton")
        },dismiss=>{
          console.log("Cross Button")
          this.getNoteList();
        })
    }

    openEditNote(noteId: number) {
        this.noteModel =  this.noteModelList.filter(p => p.id === Number(noteId))[0];
        if (this.noteModel != null && this.noteModel !== undefined) {
          const modalRef = this.modalService.open(NoteComponent, { size: 'lg' });
          modalRef.componentInstance.noteData = this.noteModel;
          modalRef.result.then(res=>{
            console.log("CloseButton")
          },dismiss=>{
            console.log("Cross Button")
            this.getNoteList();
          })
        }
    }

    deleteNote(noteId: number){
      this.noteService.delete(noteId).subscribe({
        complete:() => {
          this.toastr.success('Note deleted successfully', 'Note');
          this.getNoteList();
        },
        error:(e) => {
          console.log(e);
          this.toastr.error(e, 'Note');
        }
      });
    }

    onSelectCategory(event: any){
      let categoryId = event.target.value;
      categoryId = Number(categoryId);
      if(categoryId === 0){
        this.getNoteList();
      } else {
        this.getNoteListByCategory(categoryId);
      }
    }

    onLogout(){
      this.tokenStorageService.signOut();
    }

}