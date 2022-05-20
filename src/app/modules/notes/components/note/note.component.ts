import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from "ngx-toastr";
import { CategoryModel } from "../../models/category.model";
import { NoteModel } from "../../models/note.model";
import { CategoryService } from "../../services/category.service";
import { NoteService } from "../../services/note.service";

@Component({
  selector: 'note-modal',
  templateUrl: 'note.component.html'
})

export class NoteComponent implements OnInit {
  @Input() noteData : NoteModel;

  closeResult: string | undefined;

  noteForm: FormGroup;
  submitted: boolean = false;
  noteModel: NoteModel;
  categoryList: CategoryModel[] = [];

  constructor(
    private modal: NgbModal,
    private fromBuilder: FormBuilder,
    private categoryService: CategoryService,
    private noteService: NoteService,
    private toastr: ToastrService
  ) { }

  get frm() { return this.noteForm.controls; }

  ngOnInit(): void {
    
    this.noteForm = this.fromBuilder.group({
      id: 0,
      title: ['', Validators.required],
      content: ['', Validators.required],
      categoryId: [1]
    });

    if (this.noteData != null && this.noteData !== undefined) {
      this.noteForm.controls.categoryId.setValue(this.noteData.categoryId);
      this.noteForm.controls.title.setValue(this.noteData.title);
      this.noteForm.controls.content.setValue(this.noteData.content);
      this.noteForm.controls.id.setValue(this.noteData.id);
    }


    this.getCategoryList();
  }

  dismiss() {
    this.modal.dismissAll();
  }

  save(){
    this.submitted = true;
    if (this.noteForm.invalid) {
      return;
    }

    this.noteModel = this.noteForm.getRawValue();
    console.log(this.noteModel);
    this.noteService.save(this.noteModel).subscribe({
      complete:() => {
        this.clearForm();
        this.toastr.success('Note saved successfully', 'Note');
        this.dismiss();
      },
      error:(e) => {
        console.log(e);
        this.toastr.error(e, 'Note');
      }
    });
  }

  clearForm(){
    this.noteForm.patchValue({
      id: 0,
      title: '',
      content: '',
      categoryId: 1,
    });
    this.submitted = false;
  }

  getCategoryList(){
    this.categoryService.getActiveList().subscribe(response => 
      {
        this.categoryList = response;
      });
  }
}