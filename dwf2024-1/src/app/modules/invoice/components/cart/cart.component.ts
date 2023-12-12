import { Component } from '@angular/core';
import { Cart } from '../../_models/cart';
import { CartService } from '../../_services/cart.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../_services/invoice.service';
import { ProductService } from 'src/app/modules/product/_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any | Cart[] = [];
  count: any | number = 0;
  rfc: any | string = "";
  subtotal: any | number = 0;
  total: number = 0;

  constructor(
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private cartService: CartService, // servicio cart de API
    private invoiceService: InvoiceService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.rfc = localStorage.getItem('user_rfc');
    if (this.rfc) {
      this.getCart();
      this.getTotal();
    }
  }

  // addToCart -> product

  removeFromCart(item: Cart){
    this.cartService.removeFromCart(item.cart_id).subscribe(
      (res: any) => {
        this.updateStock(item.gtin, item.quantity);
        this.cart = res;
        Swal.fire({
          title: 'Producto eliminado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCart();
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  updateStock(gtin: string, quantity: number) {
    this.productService.updateProductStock(gtin, quantity).subscribe(
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
          timer: 2000
        });
      }
    );
  }

  updateQuantity(gtin: string, quantity: number) {
    this.productService.updateProductStock(gtin, quantity).subscribe(
      (res: any) => {
        console.log("stock actualizado");
        this.getCart();
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
          timer: 2000
        });
      }
    );
  }

  getCart() {
    this.cartService.getCart(this.rfc).subscribe(
      (data: any) => {
        this.cart = data;
        this.cart.forEach((element: Cart) => {
          this.count += element.quantity;
        });
        this.cartService.updateCount(this.count);
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  deleteCart(){
    this.cartService.deleteCart(this.rfc).subscribe(
      (data: any) => {
        this.cart = data;
        Swal.fire({
          title: 'Carrito vaciado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err=>{
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  getTotal() {
    this.cartService.getCart(this.rfc).subscribe(
      res => {
        res.forEach(element => {
          this.total += element.product.price * element.quantity;
        });
      }
    )
  }

  generateInvoice() {
    this.invoiceService.generateInvoice(this.rfc).subscribe(
      res => {        
        Swal.fire({
          title: 'Factura generada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.getCart();
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

}
