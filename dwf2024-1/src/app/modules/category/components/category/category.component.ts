/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 5
  Fecha: 12/12/2023 */

import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from "../../_services/category.service";
import { LayoutService } from 'src/app/modules/layout/_service/layout.service';
import { CartService } from 'src/app/modules/invoice/_services/cart.service';

import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: Category[] = [];
  activeCategories: Category[] = [];
  categoryUpdated: number = 0;

  sortStatus = true;
  currentPage = 1;
  itemsPerPage = 10;

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private cartService: CartService,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.cartService.getCount().subscribe(count => {
      this.layoutService.updateLayout(count);
    });
  }

  // Función para cambiar la página
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // modal

  showModalForm() {
    this.categoryUpdated = 0;
    this.form.reset();
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  onSubmit() {
    // validación
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    if (this.categoryUpdated == 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  getCategories() {
    this.sortStatus = true;
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res.sort((a, b) => a.category_id - b.category_id); // lista de categorías de la API
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal al obtener los datos.'
        })
      }
    );
  }

  onSubmitCreate() {
    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Nueva categoría creada',
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
          text: '¡Algo salió mal al crear los datos!'
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
          title: 'Categoría actualizada!',
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
          text: '¡Algo salió mal al actualizar los datos!'
        })
      }
    );
  }

  getCategory(id: string) {
    if (!id) { return; }
    let id_category = Number(id);
    this.categoryService.getCategory(id_category).subscribe(
      res => {
        console.log(res);
        console.log(this.categories.filter(el => el.category_id == id_category));
        this.categories = [res];
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal, no se pudo habilitar el elemento!'
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

  disableCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Categoría deshabilitada!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCategories();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal, no se pudo deshabilitar el elemento!'
        })
      }
    );
  }

  enableCategory(id: number) {
    this.categoryService.activateCategory(id).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Categoría habilitada!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCategories();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal, no se pudo habilitar el elemento!'
        })
      }
    );
  }

  getActiveCategories() {
    this.sortStatus = false;
    this.categoryService.getActiveCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal, no se pudo habilitar el elemento!'
        })
      }
    );
  }

  getInactiveCategories() {
    this.sortStatus = false;
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res.sort((a, b) => a.category_id - b.category_id); // lista de categorías de la API
        this.categories = this.categories.filter(el => el.status == 0);
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal al obtener los datos.'
        })
      }
    );
  }

  cleanSearch(inputField: HTMLInputElement) {
    inputField.value = '';
    this.getCategories();
  }
}
