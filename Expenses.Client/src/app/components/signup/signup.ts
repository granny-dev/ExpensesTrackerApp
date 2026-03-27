import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,) {
    this.signupForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
  {
    validators: this.passwordMatchValidator,
  });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return (control?.touched || control?.dirty) && control?.hasError(errorName) || false;
  }

  passwordMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() : void {
    this.errorMessage = null;
    if (this.signupForm.valid) {
      const signup = this.signupForm.value;
      this.authService.register(signup).subscribe({
        next: () => {
          console.log('Signup successful');
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'An error occurred during signup. Please try again.';
        }
      })
    } else {
      this.errorMessage = 'Please fill out the form correctly before submitting.';
    }
  }
}
