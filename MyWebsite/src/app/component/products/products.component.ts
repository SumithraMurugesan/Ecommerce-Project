import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  ProductView: any;
  constructor(private api: ApiService, private cartService: CartService , private toastr :ToastrService) { }
  ngOnInit(): void {
    this.api.findApi("product", "testdb")
      .subscribe((res: any) => {
        console.log("response", res);
        this.productList = this.filterCategory = this.products = res.rows.map((x: any) => x.doc)
        console.log("productList", this.productList);
        console.log("filter", this.filterCategory);
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
      });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addtocart(item: any) {
    console.log("orderlist", item);
    this.cartService.addtoCart(item);
    this.toastr.success("your product added to cart successfully");
    
  }
  viewProduct(id: any) {
    this.api.getDataById("testdb", id).subscribe((res: any) => {
      console.log(res);
      this.ProductView = res;
      this.cartService.viewProduct(this.ProductView);
    })
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
