import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoryModel } from "../../models/category.model";
import { CategoryService } from "../../services/category.service";

interface Country {
  name: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    area: 9596960,
    population: 1409517397
  }
];

@Component({
  selector: 'category-modal',
  templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnInit {
  @ViewChild('content') content: any;
  countries = COUNTRIES;

  closeResult: string | undefined;

  categoryForm: FormGroup;
  submitted: boolean = false;
  categoryModel: CategoryModel;
  categoryList: CategoryModel[] = [];

  constructor(
    private modal: NgbModal,
    private fromBuilder: FormBuilder,
    private categoryService: CategoryService
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
        this.getCategoryList();
      },
      error:(e) => {
        console.log(e);
      }
    });
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