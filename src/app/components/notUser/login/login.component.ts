import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Usuario from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  badUser:boolean=false;

  user:Usuario={};

  constructor(
    private accountSrv: AccountService,
    private router: Router) { 
    this.badUser=false;
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.accountSrv.login(f.value.username, f.value.password).subscribe(res => {this.router.navigate(['/productos'])}, err => this.badUser=true);
  }

}
