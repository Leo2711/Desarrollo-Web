/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 1
  Fecha: 02/10/2023 */

import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';

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
  ){}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    let category1 = new Category(1, "Column content", "Column content", 1);
    let category2 = new Category(2, "Column content", "Column content", 1);
    let category3 = new Category(3, "Column content", "Column content", 0);

    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    let category = new Category(0, this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
    this.categories.push(category);
    
    $("#modalForm").modal("hide");

    alert("Categoria guardada exitosamente!");

  }

  // modals 

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  // CRUD

  disableCategory(id: number){
    for(let Category of this.categories){
      if(Category.category_id == id){
        Category.status = 0;
        alert("Región desactivada exitosamente!");
        break;
      }
    }
    console.log("SALIR")
  }

  enableCategory(id: number){
    for(let Category of this.categories){
      if(Category.category_id == id){
        Category.status = 1;
        alert("Región activada exitosamente!");
        break;
      }
    }
  }

  updateCategory(Category: Category){
    this.categoryUpdated = Category.category_id;
    
    this.form.reset();
    this.form.controls['category'].setValue(Category.category);
    this.form.controls['code'].setValue(Category.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

}
