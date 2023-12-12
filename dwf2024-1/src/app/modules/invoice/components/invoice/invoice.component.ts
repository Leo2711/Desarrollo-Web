import { Component } from '@angular/core';
import { Invoice } from '../../_models/invoice';
import { Product } from 'src/app/modules/product/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../_services/invoice.service';
import { ProductService } from 'src/app/modules/product/_services/product.service';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/modules/customer/_models/customer';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  rfc: any | string = "";
  id: any | number = 0;

  invoice : any | Invoice;
  customer : any | Customer;
  product: any | Product;
  products: any | Product[] = [];

  constructor(
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private invoiceService: InvoiceService, // servicio invoice de API
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.rfc = localStorage.getItem('user_rfc');
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInvoice();
    this.getCustomer();   
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }

  getInvoice() {
    this.invoiceService.getInvoice(this.id).subscribe(
      res => {
        this.invoice = res;
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

  getCustomer() {
    this.invoiceService.getInvoice(this.id).subscribe(
      res => {
        this.customer = res.customer;
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

  getProduct(gtin: any) {
    this.productService.getProduct(gtin).subscribe(
      res => {
        this.product = res;
      }
    );
  }

}
