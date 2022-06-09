import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get userid() {
    return this.loginForm.get('userid');
  }
  get password() {
    return this.loginForm.get('password');
  }
  adminlogin(Formvalue: any) {

    console.log("from form", Formvalue);
    this.api.adminData(Formvalue).subscribe((data) => {
      data = data.response
      if (data.docs.length > 0) {
        this.toastr.success("login sucessfully!");
        this.router.navigate(['admin']);
      }
      console.log("data returned from server", data);
    })
  }
}

