import { Component } from '@angular/core';
import { CartService } from '../../invoice/_services/cart.service';

@Component({
  selector: 'app-router-navbar',
  templateUrl: './router-navbar.component.html',
  styleUrls: ['./router-navbar.component.css']
})
export class RouterNavbarComponent {
  count: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.currentCount.subscribe(count => {
      this.count = count;
    });
  }
}