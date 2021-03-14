import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  username;
  password;

  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      "username":[],
      "password":[]
    })
  }

  login() {
    
    console.log(this.username);
    
    //this.router.navigate(['tabs']);
  }

}
