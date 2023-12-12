import { Component } from '@angular/core';
import { DtoInvoiceList } from '../../_dtos/dto-invoice-list';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../_services/invoice.service';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/modules/product/_services/product.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {

  rfc: any | string = "";
  
  invoices: any | DtoInvoiceList[] = [];  

  constructor(
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private invoiceService: InvoiceService, // servicio invoice de API
  ) { }

  ngOnInit() {
    this.rfc = localStorage.getItem('user_rfc');
    this.getInvoices();      
  }

  showInvoice(invoice_id: string) {
    this.router.navigate(['invoice/' + invoice_id]);
  }

  getInvoices() {
    this.invoiceService.getInvoices(this.rfc).subscribe(
      res => {
        this.invoices = res.sort((a, b) => a.invoice_id - b.invoice_id);
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