import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteModel } from "../../models/note.model";
import { NoteService } from "../../services/note.service";
import { CategoryComponent } from "../category/category.component";
import { NoteComponent } from "../note/note.component";

@Component({
    templateUrl: 'notes.component.html'
})

export class NotesComponent implements OnInit {

    title = 'Welcome Back';
    noteModel: NoteModel;
    noteModelList: NoteModel[] = [];

    constructor(
        private modalService: NgbModal, 
        private noteService: NoteService
    ){}

    ngOnInit() {
        this.getNoteList();
    }

    getNoteList(){
        this.noteService.getList().subscribe(response => 
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
}