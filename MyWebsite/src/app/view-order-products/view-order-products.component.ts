import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-order-products',
  templateUrl: './view-order-products.component.html',
  styleUrls: ['./view-order-products.component.css']
})
export class ViewOrderProductsComponent implements OnInit {
  dataset: any;
  viewOrderProduct: any;

  constructor(public active: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.active.queryParams.subscribe(data => {
      this.dataset = data;
      console.log(data);

      this.api.orderProduct(data, "testdb")
        .subscribe((res: any) => {
          this.viewOrderProduct = res.docs
          const product_ids = this.viewOrderProduct.map((res: any) => res['product']);
          this.api.alldocsapi({ keys: product_ids }, "testdb").subscribe((result: any) => {
            console.log(result)
            const lkpData = result.rows.map((res1: any) => res1['doc']);
            this.viewOrderProduct.forEach((element: any) => {
              element['productData'] = lkpData.filter((lkp: any) => lkp['_id'] === element['product'])[0]
            });
          });
          console.log("orderProduct", res);
        });
    })
  }
 
}
