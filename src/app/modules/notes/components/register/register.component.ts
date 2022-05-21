import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../models/UserModel';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  
  title = "Register";
  registrationForm: FormGroup;
  submitted: boolean = false;
  userModel: UserModel;

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ){}

  get frm() { return this.registrationForm.controls; }
  
  ngOnInit(): void {
    this.registrationForm = this.fromBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onRegister() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.userModel = this.registrationForm.getRawValue();

    this.authService.register(this.userModel).subscribe({
        complete:() => {
            this.toastr.success('Registration Successful', 'Register');
            this.router.navigate(['/']);
        },
        error:(e) => {
          console.log(e);
          this.toastr.error('Registration Failed', 'Register');
          this.submitted = false;
        },
        
      });
  }

  onLogin(){
    this.router.navigate(['/']);
  }
}


