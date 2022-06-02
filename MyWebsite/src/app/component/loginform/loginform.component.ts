import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

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

  saving(Formvalue: any) {

    const login = {
      userid: Formvalue.userid,
      password: Formvalue.password,
      type: "admin",
    }
    console.log("from form", Formvalue);
    this.api.adminData(Formvalue).subscribe((data) => {
      if (data.docs.length > 0) {
        this.router.navigate(['admin'], {
        })
      }
      console.log("data returned from server", data);
    })
  }
}

