import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../service/api.service'
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})

export class CheckoutFormComponent implements OnInit {
  checkoutForm: FormGroup;
  userRecord: any = {
    firstName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cname: '',
    ccnum: '',
    expmonth: '',
    expyear: '',
    cvv: '',
    type: "order",
  };

  userData: any;
  products = [];
  grandTotal: any;
  totalItem: any;
  userId: any;
  constructor(private fb: FormBuilder, private cartService: CartService, private api: ApiService, private cart: CartComponent, private router: Router, private toastr: ToastrService) {
    this.checkoutForm = this.fb.group({
      firstName: [this.userRecord.firstName],
      email: [this.userRecord.email],
      address: [this.userRecord.address],
      city: [this.userRecord.city],
      state: [this.userRecord.state],
      zip: [this.userRecord.zip],
      cname: [this.userRecord.cname],
      ccnum: [this.userRecord.ccnum],
      expmonth: [this.userRecord.expmonth],
      expyear: [this.userRecord.expyear],
      cvv: [this.userRecord.cvv],
      type: [this.userRecord.type]
    });
  }


  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9]*@gmail.com")]],
      address: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      state: ['', [Validators.required,]],
      zip: ['', [Validators.required, Validators.maxLength(5)]],
      cname: ['', [Validators.required,]],
      ccnum: ['', [Validators.required,]],
      expmonth: ['', [Validators.required,]],
      expyear: ['', [Validators.required,]],
      cvv: ['', [Validators.required,]],

    });
    this.cartService.getProducts()
      .subscribe((res: any) => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }
  get firstName() {
    return this.checkoutForm.get('firstName')!;
  }
  get email() {
    return this.checkoutForm.get('email')!;
  }
  get address() {
    return this.checkoutForm.get('address')!;
  }
  get city() {
    return this.checkoutForm.get('city')!;
  }
  get state() {
    return this.checkoutForm.get('state')!;
  }
  get zip() {
    return this.checkoutForm.get('zip')!;
  }
  get cname() {
    return this.checkoutForm.get('cname')!;
  }
  get ccnum() {
    return this.checkoutForm.get('ccnum')!;
  }
  get expmonth() {
    return this.checkoutForm.get('expmonth')!;
  }
  get expyear() {
    return this.checkoutForm.get('expyear')!;
  }
  get cvv() {
    return this.checkoutForm.get('cvv')!;
  }

  order(Formvalue: any) {
    const userData = JSON.parse(localStorage.getItem('obj1') || '{}');
    this.userId = userData['_id'];
    console.log(this.userId);
    const information = {
      "firstName": Formvalue.firstName,
      "email": Formvalue.email,
      "address": Formvalue.address,
      "city": Formvalue.city,
      "state": Formvalue.state,
      "zip": Formvalue.zip,
      "cname": Formvalue.cname,
      "ccnum": Formvalue.ccnum,
      "expmonth": Formvalue.expmonth,
      "expyear": Formvalue.expyear,
      "cvv": Formvalue.cvv,
      type: "order",
      user: this.userId,
    }
    this.checkoutForm.reset();
    this.api.addInfo("testdb", information).subscribe((res: any) => {
      console.log(res);
      const oderId = res.id;
      let taskList: any = []
      this.products.forEach(element => {
        const orderInfo = {
          "order": oderId,
          "product": element['_id'],
          "quantity": element['quantity'],
          "price": element['price'],
          "type": "orderInfo"
        }
        taskList.push(this.api.addInfo("testdb", orderInfo).subscribe((_res: any) => {
          return _res
        }))
      });
      Promise.all(taskList).then(result => {
        console.log("orderINfo", result)
        this.toastr.success(" your order placed successfully!")
        this.router.navigate(['orderplaced'])
        this.cartService.removeAllCart();
      })
    }, err => {
      console.log(err)
    });
  }
}



