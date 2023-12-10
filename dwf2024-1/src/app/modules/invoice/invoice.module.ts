import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    InvoiceComponent,
    CartComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class InvoiceModule { }