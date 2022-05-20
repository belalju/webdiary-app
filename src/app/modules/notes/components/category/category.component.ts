import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { CategoryModel } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: 'category-modal',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
  @ViewChild('content') content: any;

  closeResult: string | undefined;

  categoryForm: FormGroup;
  submitted: boolean = false;
  categoryModel: CategoryModel;
  categoryList: CategoryModel[] = [];

  constructor(
    private modal: NgbModal,
    private fromBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  get frm() { return this.categoryForm.controls; }

  ngOnInit(): void {
    this.categoryForm = this.fromBuilder.group({
      id: 0,
      categoryName: ['', Validators.required],
      statusId: ['1', Validators.required]
    });
    
    this.getCategoryList();
  }


  open() {
    // and use the reference from the component itself
    this.modal.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }

  dismiss() {
    this.modal.dismissAll();
  }

  save(){
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }

    this.categoryModel = this.categoryForm.getRawValue();
    console.log(this.categoryModel);

    this.categoryService.save(this.categoryModel).subscribe({
      complete:() => {
        this.clearForm();
        this.toastr.success('Category saved successfully', 'Category');
        this.getCategoryList();
      },
      error:(e) => {
        console.log(e);
        this.toastr.error(e, 'Category');
      }
    });
  }

  clearForm(){
    this.categoryForm.patchValue({
      id: 0,
      categoryName: '',
      statusId: 1,
    });
    this.submitted = false;
  }

  getCategoryList(){
    this.categoryService.getList().subscribe(response => 
      {
        this.categoryList = response;
      });
  }

  onSelectCategory(categoryId: number) {
    this.categoryModel =  this.categoryList.filter(p => p.id === Number(categoryId))[0];
    if (this.categoryModel != null && this.categoryModel !== undefined) {
      this.categoryForm.controls.categoryName.setValue(this.categoryModel.categoryName);
      this.categoryForm.controls.statusId.setValue(this.categoryModel.statusId);
      this.categoryForm.controls.id.setValue(this.categoryModel.id);
    }
  }
}