import { Component } from '@angular/core';
import { Cart } from '../../_models/cart';
import { CartService } from '../../_services/cart.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../_services/invoice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: any | Cart[] = [];
  count: any | number = 0;
  rfc: any | string = "";

  constructor(
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private cartService: CartService, // servicio cart de API
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    this.rfc = localStorage.getItem('user_rfc');
    if (this.rfc) {
      this.getCart();
    }
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

  removeFromCart(id: number){
    this.cartService.removeFromCart(id).subscribe(
      (res: any) => {
        this.cart = res;
        Swal.fire({
          title: 'Producto eliminado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
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

  generateInvoice() {
    this.invoiceService.generateInvoice(this.rfc).subscribe(
      res => {
        console.log("bien");
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

}
