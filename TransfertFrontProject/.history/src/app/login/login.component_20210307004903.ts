import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogServiceService } from './services/log-service.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  username;
  password;
  useer;

  constructor(private router:Router, private fb:FormBuilder, private logService:LogServiceService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login() {
    //console.log(this.useer);
    
    
    console.log(this.userForm.value);
    
    //this.router.navigate(['tabs']);
  }

}
