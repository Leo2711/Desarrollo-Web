/* @author Mónica Miranda Mijangos 
  @author Eduardo Leónel Sánchez Velasco 
  Version: 1
  Fecha: 02/10/2023 */

import { Component } from '@angular/core';
import { Category } from '../../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories: Category[] = [];

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    let category1 = new Category(1, "Column content", "Column content", 1);
    let category2 = new Category(2, "Column content", "Column content", 1);
    let category3 = new Category(3, "Column content", "Column content", 0);

    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
  }

}
