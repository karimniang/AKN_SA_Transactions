import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogServiceService } from './services/log-service.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  username;
  password;
  token;

  constructor(private router:Router, private fb:FormBuilder, private logService:LogServiceService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  async login() {
    if (!this.userForm.valid) {
      return;
    }
    //console.log(this.userForm.value.username);
    // await this.logService.saveToken(this.userForm.value.username,this.userForm.value.password);
    // this.token = await this.logService.getToken()?jwt_decode(this.logService.getToken()):null;

    this.logService.login(this.userForm.value.username,this.userForm.value.password).subscribe(
      res=>{
        console.log(res);
        
      }
    );
    console.log(this.token);
    if (this.token != null) {
      //console.log(this.token.roles);
      //this.redirectByRole(this.token.roles[0]);
    }
    //this.router.navigate(['tabs']);
  }

}
