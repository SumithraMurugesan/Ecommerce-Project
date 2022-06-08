import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {
  viewOrderDetails: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.findApi("order", "testdb")
      .subscribe((res: any) => {
        console.log("response", res);

        this.viewOrderDetails = res.rows.map((x: any) => x.doc)
      });
  }
  orderInfo(id : any) {
    this.router.navigate(
      ['/viewOrderProducts'],
      { queryParams: { orderid: id } }
    );
  }

}
