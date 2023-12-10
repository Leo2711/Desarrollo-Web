import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080";
  private route = "/cart";

  private countSource = new BehaviorSubject<number>(0);
  currentCount = this.countSource.asObservable();

  constructor(private http: HttpClient) { }

  updateCount(count: number) {
    this.countSource.next(count);
  }

  addToCart(cart: any) {
    return this.http.post(this.url + this.route, cart);
  }

  deleteCart(rfc: string) {
    return this.http.delete(this.url + this.route + "/clear/" + rfc);
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función getCart() */
  getCart(rfc: string) {
    return this.http.get(this.url + this.route + "/" + rfc);
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función removeFromCart() */
  removeFromCart(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }
}
