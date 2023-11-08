import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductImage } from '../_models/product-image';
// import { ProductImage } from '../_dtos/dto-producct_image-list';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private url = "http://localhost:8080";
  private route = "/product-image";

  constructor(private http: HttpClient) { }

  updateProductImage(product_image: ProductImage) {
    return this.http.put(this.url + this.route, product_image);
  }

  getProductImage(gtin: string) {
    return this.http.get(this.url + this.route + "/" + gtin);
  }

  deleteProductImage(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }
}
