import { Component } from '@angular/core';
import { DtoProductList } from '../../_dtos/dto-product-list';
import { Category } from '../../../category/_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { CategoryService } from '../../../category/_services/category.service';

import Swal from 'sweetalert2'; // sweetalert
import { Router } from '@angular/router';
import { CategoryModule } from 'src/app/modules/category/category.module';
import { Cart } from 'src/app/modules/invoice/_models/cart';
import { CartService } from 'src/app/modules/invoice/_services/cart.service';

declare var $: any; // jquery

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: DtoProductList[] = []; // lista de productos
  categories: Category[] = []; // lista de categorías
  cart: any | Cart[] = [];
  rfc: any | string = "";

  sortStatus = true;
  currentPage = 1;
  itemsPerPage = 12;

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
    private cartService: CartService, // servicio cart de API
    private categoryService: CategoryService, // servicio category de API
    private formBuilder: FormBuilder, // formulario
    private productService: ProductService, // servicio product de API
    private router: Router, // redirigir a otro componente
  ) { }

  // primera función que se ejecuta
  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.rfc = localStorage.getItem('user_rfc');
  }

  // Función para cambiar la página
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  showModalForm() {
    this.form.reset();
    this.submitted = false;
    this.getCategories();
    $("#modalForm").modal("show");
  }

  // CRUD product

  getProducts() {
    this.sortStatus = true;
    this.productService.getProducts().subscribe(
      res => {
        this.products = res; // asigna la respuesta de la API a la lista de productos
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "Error al cargar los datos",
          background: '#F8E8F8',
          timer: 3000
        });
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
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El producto ha sido registrado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 3000
        });

        this.getProducts(); // consulta productos con los cambios realizados

        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "No se puedo crear el producto",
          background: '#F8E8F8',
          timer: 3000
        });
      }
    );
  }

  getProduct(gtin: string) {
    if (!gtin) { return; }
    this.productService.getProduct(gtin).subscribe(
      res => {
        console.log(res);
        console.log(this.products.filter(el => el.gtin == gtin));
        this.products = [res];
      },
      err => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "No se encontró el producto",
          background: '#FFEFFF',
          timer: 3000
        });
      }
    );
  }

  updateStock(product: any, quantity: any) {
    this.productService.updateProductStock(product.gtin, quantity).subscribe(
      (res: any) => {
        console.log("stock actualizado");
      },
      err => {
        console.log("stock NO actualizado");
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#FFEFFF',
          timer: 3000
        });
      }
    );
  }

  // updateProduct -> product-image

  disableProduct(id: number) {
    Swal.fire({
      title: "Desea desactivar este producto?",
      text: "Está acción desactivará el producto seleccionado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Desactivar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          res => {
            // muestra mensaje de confirmación
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              toast: true,
              text: 'El producto ha sido desactivado',
              background: '#E8F8F8',
              showConfirmButton: false,
              timer: 3000
            });

            this.getProducts(); // consulta productos con los cambios realizados
          },
          err => {
            // muestra mensaje de error
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              toast: true,
              showConfirmButton: false,
              text: "No se pudo desactivar el producto",
              background: '#F8E8F8',
              timer: 3000
            });
          }
        );
      }
    });
  }

  enableProduct(id: number) {
    Swal.fire({
      title: "Desea activar este producto?",
      text: "Está acción activará el producto seleccionado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Activar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.activateProduct(id).subscribe(
          res => {
            // muestra mensaje de confirmación
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              toast: true,
              text: 'El producto ha sido activado',
              background: '#E8F8F8',
              showConfirmButton: false,
              timer: 3000
            });

            this.getProducts(); // consulta productos con los cambios realizados
          },
          err => {
            // muestra mensaje de error
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              toast: true,
              showConfirmButton: false,
              text: "No se pudo activar el producto",
              background: '#F8E8F8',
              timer: 3000
            });
          }
        );
      }
    });
  }

  getActiveProducts() {
    this.sortStatus = false;
    this.productService.getActiveProducts().subscribe(
      res => {
        this.products = res;
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "No se encontraron productos activos",
          background: '#F8E8F8',
          timer: 3000
        });
      }
    );
  }

  getInactiveProducts() {
    this.sortStatus = false;
    this.productService.getProducts().subscribe(
      res => {
        this.products = res.filter(el => el.status == 0);
        if (this.products.length == 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            toast: true,
            showConfirmButton: false,
            text: "No se encontraron productos inactivos ",
            background: 'white',
            timer: 3000
          });
        }
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "Error al cargar los datos",
          background: '#F8E8F8',
          timer: 3000
        });
      }
    );
  }

  getProductsByCategory(category_id: number) {
    console.log(category_id);
    this.productService.getProductsByCategory(category_id).subscribe(
      res => {
        this.products = res;
        if (this.products.length == 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            text: "No se encotraron productos en está categoría",
            background: '#FFEFFF',
            timer: 3000
          });
        }
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "Error al cargar los datos",
          background: '#F8E8F8',
          timer: 3000
        });
      }
    );
  }

  // Auxiliares

  showProduct(gtin: string) {
    this.router.navigate(['product/' + gtin]);
  }

  getCategory(id: number) {
    return this.categories.find(element => element.category_id == id)?.category;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categories
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "Error al cargar los datos",
          background: '#F8E8F8',
          timer: 3000
        });
      }
    );
  }

  addToCart(product: any, quantity: number = 1) {
    if (product.status == 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: "Producto desactivado",
        background: '#F8E8F8',
        timer: 3000
      });
      return;
    }
    let newCart: Cart = new Cart();
    newCart.cart_id = product.id;
    newCart.gtin = product.gtin;
    newCart.quantity = quantity;
    newCart.rfc = this.rfc;
    newCart.status = product.status;
    this.cartService.addToCart(newCart).subscribe(
      (res: any) => {
        this.cart = res;
        this.updateStock(product, -quantity);
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: "No se pudo añadir al carrito",
          background: '#F8E8F8',
          timer: 3000
        });
      }
    );
  }

  cleanSearch(inputField: HTMLInputElement) {
    inputField.value = '';
    this.getProducts();
  }
}
