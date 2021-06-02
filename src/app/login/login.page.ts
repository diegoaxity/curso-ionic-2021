import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginRequest } from '../model/login.model';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dataService: DataService) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.dataService.isLoading.asObservable().subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnInit() {
  }

  login() {
    console.log(this.formLogin.value);
    const data = this.formLogin.value as LoginRequest;
    this.dataService.isLoading.next(true);
    this.loginService.login(data).subscribe(res => {
      console.log(res);
      this.dataService.isLoading.next(false);
      this.router.navigate(['home']);
    }, err => {
      this.dataService.isLoading.next(false);
      this.dataService.message.next(err.error.error);
    });
  }
}
