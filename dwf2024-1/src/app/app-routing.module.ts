/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 4
  Fecha: 04/11/2023 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/category/components/category/category.component';
import { ProductComponent } from './modules/product/components/product/product.component';

const routes: Routes = [
  // { path: '', component: CategoryComponent },
  { path: "category", component: CategoryComponent },
  { path: "product", component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
