/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 2
  Fecha: 02/10/2023 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/components/category/category.component';

const routes: Routes = [
  {path: "category", component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
