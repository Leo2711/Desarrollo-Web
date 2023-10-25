/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 3
  Fecha: 25/10/2023 */

import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from "../../_services/category.service";

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: Category[] = [];
  categoryUpdated: number = 0;  

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // lista de categorías de la API
      },
      err => {
        // mensaje de error
      }
    );
  }

  onSubmit() {
    // validación
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;
    
    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        // mensaje de confirmación
      
        this.getCategories();

        $("#modalForm").modal("hide");
      },
      err => {
        // mensaje de error
      }
    );
  }

  onSubmitUpdate() {
    this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
      res => {
        // mensaje de confirmación      
    
        this.getCategories();

        $("#modalForm").modal("hide");

        this.categoryUpdated = 0;
      },
      err => {
        // mensaje error
      }
    );
  }

  // CRUD

  disableCategory(id: number) {
    this.categoryService.disableCategory(id).subscribe (
      res => {
        // mensaje de confirmación
        this.getCategories();
      }, 
      err => {
        // mensaje de error
      }
    );
  }

  enableCategory(id: number) {
    this.categoryService.enableCategory(id).subscribe (
      res => {
        // mensaje de confirmación
        this.getCategories();
      }, 
      err => {
        // mensaje de error
      }
    );
  }

  updateCategory(Category: Category) {
    this.categoryUpdated = Category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(Category.category);
    this.form.controls['code'].setValue(Category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  // modals 

  showModalForm(){
    this.categoryUpdated = 0;
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }
  
}
