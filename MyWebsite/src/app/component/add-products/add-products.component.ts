import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  addProduct: FormGroup;
  userRecord: any = {
    title: '',
    price: '',
    count: '',
    description: '',
    image: '',
    category: '',
    type: 'product',
  };
  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, private router: Router) {
    this.addProduct = this.fb.group({
      title: [this.userRecord.title],
      price: [this.userRecord.price],
      count: [this.userRecord.count],
      description: [this.userRecord.description],
      image: [this.userRecord.image],
      category: [this.userRecord.category],
      type: [this.userRecord.type]
    });
  }
  get title() {
    return this.addProduct.get('title')!;
  }
  get count() {
    return this.addProduct.get('count')!;
  }
  get description() {
    return this.addProduct.get('description')!;
  }
  get image() {
    return this.addProduct.get('image');
  }
  get category() {
    return this.addProduct.get('category');
  }
  addProducts(Formvalue: any) {
    const productlist = {
      "title": Formvalue.title,
      "price": Formvalue.price,
      "count": Formvalue.count,
      "description": Formvalue.description,
      "image": Formvalue.image,
      "category": Formvalue.category,
      type: "product",
    };
    this.api.addProduct("testdb", productlist).subscribe(res => {
      console.log(res);
      this.toastr.success("Your product was created successfully!")
    }, err => {
      console.log(err);
    });
  }
}

