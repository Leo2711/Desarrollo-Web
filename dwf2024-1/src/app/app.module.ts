/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 3
  Fecha: 04/11/2023 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';

import { LayoutModule } from './modules/layout/layout.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPhotoEditorModule,
    AppRoutingModule,
    LayoutModule,
    CategoryModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
