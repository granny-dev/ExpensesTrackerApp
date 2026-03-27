import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,) {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.touched || control?.dirty) && control?.hasError(errorName) || false;
  }

  onSubmit() : void {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      const login = this.loginForm.value;
      this.authService.login(login).subscribe({
        next: () => {
          console.log('Login successful');
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during login. Please try again.';
        }
      })
    } else {
      this.errorMessage = 'Please fill out the form correctly before submitting.';
    }
  }
}
