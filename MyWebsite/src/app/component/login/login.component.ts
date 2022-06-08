import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signUpForm: FormGroup;
  submitted = false;
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



  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,
    private toastr: ToastrService) {


    this.signUpForm = this.fb.group({
      userName: [this.userRecord1.userName],
      email: [this.userRecord1.email],
      password: [this.userRecord1.password],

    });
    this.loginForm = this.fb.group({
      email2: [this.userRecord2.email2],
      password2: [this.userRecord2.password2],

    });
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
      this.toastr.success(data.message);
    })
  }

  validateEmail() {
    const emailValue = this.signUpForm.value['email']
    const query = {
      'email': emailValue,
      'type': 'user'
    }
    this.api.emailValidation(query).subscribe((response: any) => {
      console.log(response)
      if (response.docs.length > 1) {
        this.toastr.error("email already exist");
        this.submitted = false;
      }
      else {
        this.submitted = true;
      }
    }, err => {
      console.error(err)
    })

  }


  login(Formvalue: any) {
    let datas = {
      email: Formvalue.email2,
      password: Formvalue.password2
    }
    console.log(datas);
    this.api.login_get(datas).subscribe((data) => {
      const userData = { data: JSON.stringify(data.docs[0]) }
      localStorage.setItem('obj1', JSON.stringify(data.docs[0]))
      if (data.docs.length <= 0) {
        this.toastr.error("Invalid credentials");
      }
      if (data.docs[0].email === Formvalue.email2) {
        if (data.docs[0].password === Formvalue.password2) {
          this.toastr.success("Login Successfully");
          this.router.navigate(['/home'],
            { queryParams: userData })
        } else {
          this.toastr.error("Enter Correct Password");
        }
      }
    })
    localStorage.clear();
  }
}





