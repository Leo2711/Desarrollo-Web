import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../_service/layout.service';

@Component({
  selector: 'app-router-navbar',
  templateUrl: './router-navbar.component.html',
  styleUrls: ['./router-navbar.component.css']
})
export class RouterNavbarComponent implements OnDestroy {
  layout: number = 0;
  private subscription: Subscription;

  constructor(private layoutService: LayoutService) {
    this.subscription = this.layoutService.layout$.subscribe(value => {
      this.layout = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
