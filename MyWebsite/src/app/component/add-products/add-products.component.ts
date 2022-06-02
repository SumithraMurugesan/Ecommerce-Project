import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Observable } from 'rxjs'
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
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
  userData: any;
  constructor(private fb: FormBuilder, private api: ApiService) {
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

  ngOnInit(): void {
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



  addProducts(Formvalue: any) {//to add product
    const userData = JSON.parse(localStorage.getItem('obj1') || '{}');
    console.log(userData);

    const productlist = {
      "title": Formvalue.title,
      "price": Formvalue.price,
      "count": Formvalue.count,
      "description": Formvalue.description,
      "image": Formvalue.image,
      "category": Formvalue.category,
      type: "product",

    };
    this.api.add("testdb", productlist).subscribe(res => {
      console.log(res);
      alert("Your product was created successfully!");

    }, rej => {
      alert("opps" + rej);
    });

  }
  ProductDetails() { //add selector

    let data = {
      selector: {
        "type": "product",
      }
    }
  }


}

