import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtResponse } from '../../models/jwt-response.model';
import { UserModel } from '../../models/UserModel';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  
  title = "Login";
  loginForm: FormGroup;
  submitted: boolean = false;
  userModel: UserModel;

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService
  ){}

  get frm() { return this.loginForm.controls; }
  
  ngOnInit(): void {
    this.loginForm = this.fromBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.userModel = this.loginForm.getRawValue();

    this.authService.login(this.userModel).subscribe({
        next:(data: JwtResponse) => {
            this.tokenStorageService.saveToken(data.accessToken);
            this.tokenStorageService.saveUsername(data.username);
            this.tokenStorageService.saveAuthorities(data.authorities);
            this.router.navigate(['/notes']);
            return false;
        },
        complete:() => {
            this.toastr.success('Login Successful', 'Login');
        },
        error:(e) => {
          console.log(e);
          this.toastr.error('Login Failed', 'Login');
          this.submitted = false;
        },
        
      });
  }

  onRegister(){
    this.router.navigate(['/register']);
  }
}


