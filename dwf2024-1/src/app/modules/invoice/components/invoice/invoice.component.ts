import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dtos/dto-invoice-list';
import { Invoice } from '../../_models/invoice';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../_services/invoice.service';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/modules/product/_services/product.service';
import { Product } from 'src/app/modules/product/_models/product';
import { Item } from '../../_models/item';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  rfc: any | string = "";
  
  invoice: any | Invoice;
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
    this.getInvoice();
    console.log(this.invoice);    
  }

  getInvoice() {
    this.invoiceService.getInvoice(1).subscribe(
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

  getProduct(gtin: any) {
    this.productService.getProduct(gtin).subscribe(
      res => {
        this.product = res;
      }
    );
  }
}
