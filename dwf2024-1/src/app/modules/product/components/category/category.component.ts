/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 3
  Fecha: 25/10/2023 */

import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from "../../_services/category.service";
import Swal from 'sweetalert2'
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
        /** 
        Swal.fire({
          icon: 'success',
          title: 'Categories Obtained',
          showConfirmButton: false,
          timer: 1500
        })
        */
        this.categories = res; // lista de categorías de la API
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong getting the data',
          footer: '<a href="">Why do I have this issue?</a>'
        })
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
        Swal.fire({
          icon: 'success',
          title: 'New category added',
          showConfirmButton: false,
          timer: 1500
        })
      
        this.getCategories();

        $("#modalForm").modal("hide");
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong on submitting the data!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }

  onSubmitUpdate() {
    this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
      res => {
        // mensaje de confirmación      
        Swal.fire({
          icon: 'success',
          title: 'New category updated',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCategories();

        $("#modalForm").modal("hide");

        this.categoryUpdated = 0;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong on submitting the data!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }

  // CRUD

  disableCategory(id: number) {
    this.categoryService.disableCategory(id).subscribe (
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Category disabled',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCategories();
      }, 
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, couldnt disabel the item!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    );
  }

  enableCategory(id: number) {
    this.categoryService.enableCategory(id).subscribe (
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Category enabled',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCategories();
      }, 
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, couldnt enable the item!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
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
