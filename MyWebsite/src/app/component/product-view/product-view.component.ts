import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  products: any;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.display()
      .subscribe((res: any) => {
        this.products = res;
      })
  }
  addtocart(item: any) {
    console.log("orderlist", item);
    this.cartService.addtoCart(item);
  }
}

