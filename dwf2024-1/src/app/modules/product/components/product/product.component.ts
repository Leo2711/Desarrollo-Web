import { Component } from '@angular/core';
import { Product } from '../../_models/product';
import { Category } from '../../../category/_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { CategoryService } from '../../../category/_services/category.service';

import Swal from 'sweetalert2'; // sweetalert
import { Router } from '@angular/router';

declare var $: any; // jquery

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent {

  products: Product[] = []; // lista de clientes
  categories: Category[] = []; // lista de regiones

  // formulario de registro
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private categoryService: CategoryService, // servicio category de API
    private formBuilder: FormBuilder, // formulario
    private productService: ProductService, // servicio product de API
    private router: Router, // redirigir a otro componente
  ) { }

  // primera función que se ejecuta
  ngOnInit() {
    this.getProducts();
  }

  // CRUD product

  disableProduct(id: number) {
    this.productService.disableProduct(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          icon: 'success',
          title: 'Categoría deshabilitada!',
          showConfirmButton: false,
          timer: 1500
        })

        this.getProducts(); // consulta productos con los cambios realizados
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal, no se pudo deshabilitar el elemento!'
        })
      }
    );
  }

  enableProduct(id: number) {
    this.productService.enableProduct(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          icon: 'success',
          title: 'Categoría habilitada!',
          showConfirmButton: false,
          timer: 1500
        })

        this.getProducts(); // consulta productos con los cambios realizados
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal, no se pudo habilitar el elemento!'
        })
      }
    );
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.products = res; // asigna la respuesta de la API a la lista de productos
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal al obtener los datos.'
        })
      }
    );
  }

  onSubmit() {
    // valida el formulario
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    this.productService.createProduct(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          icon: 'success',
          title: 'Nuevo producto creado',
          showConfirmButton: false,
          timer: 1500
        })

        this.getProducts(); // consulta productos con los cambios realizados

        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salió mal al crear los datos!'
        })
      }
    );
  }

  showProduct(gtin: string) {
    this.router.navigate(['product/' + gtin]);
  }

  // catalogues

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categories
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal al obtener los datos.'
        })
      }
    );
  }

  // modals 

  showModalForm() {
    this.form.reset();
    this.submitted = false;
    this.getCategories();
    $("#modalForm").modal("show");
  }
}