import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // userForm: FormGroup;
  username;
  password;
  useer="nnnn";

  constructor(private router:Router, ) { }

  ngOnInit() {
    // this.userForm = this.fb.group({
    //   username:['',Validators.required],
    //   password:['',Validators.required]
    // })
  }

  login() {
    console.log(this.useer);
    
    
    //console.log(this.userForm.value);
    
    //this.router.navigate(['tabs']);
  }

}
