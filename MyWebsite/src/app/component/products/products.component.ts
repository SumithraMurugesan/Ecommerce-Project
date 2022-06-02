import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any;
  public productList: any;

  public filterCategory: any
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    const selector = {
      "type": "product"
    }
    this.api.findApi(selector, "testdb")
      .subscribe((res: any) => {
        console.log(res);
        this.productList = this.filterCategory = this.products = res['docs'];
        console.log("filter", this.filterCategory);
        
        this.productList.forEach((a: any) => {

          Object.assign(a, { quantity: 1, total: a.price });
        });
        console.log(this.productList)
      });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addtocart(item: any) {
    console.log("orderlist", item);
    this.cartService.addtoCart(item);

  }

  filter(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }

}
