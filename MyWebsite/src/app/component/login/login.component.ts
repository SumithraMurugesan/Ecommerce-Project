import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signUpForm: FormGroup;
  loginForm: FormGroup;
  obj1: any = {
    userName: '',
    email: '',
    password: '',

  };


  userRecord1: any = {
    userName: '',
    email: '',
    password: '',

  };
  userRecord2: any = {
    email2: '',
    password2: '',

  };
  toastr: any;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {


    this.signUpForm = this.fb.group({
      userName: [this.userRecord1.userName],
      email: [this.userRecord1.email],
      password: [this.userRecord1.password],

    });
    this.loginForm = this.fb.group({
      email2: [this.userRecord2.email],
      password2: [this.userRecord2.password],

    });
  }

  ngOnInit(): void {
  }
  get userName() {
    return this.signUpForm.get('userName')!;
  }

  get email() {
    return this.signUpForm.get('email')!;
  }

  get password() {
    return this.signUpForm.get('password')!;
  }

  get email2() {
    return this.loginForm.get('email2')!;
  }

  get password2() {
    return this.loginForm.get('password2')!;
  }

  signUp(Formvalue: any) {
    console.log("from form", Formvalue);
    this.api.signUpData(Formvalue).subscribe((data) => {
      console.log("data returned from server", data);
    })
  }

  login(Formvalue: any) {
    console.log(Formvalue.email2);
    this.api.login_get(Formvalue.email2).subscribe((data) => {
      if (data.docs[0].email == Formvalue.email2) {

        this.router.navigate(['/home']);

        alert("data verified");
      }
      else {
        alert("please check your email and password")
      }
      let datas = {
        username: data["docs"][0].username,
        email: data["docs"][0].email,
        password: data["docs"][0].password,
        id: data["docs"][0]._id,
      }
      localStorage.setItem('obj1', JSON.stringify(datas));
    }
    )
  }
}





