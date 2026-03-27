import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  authService = inject(AuthService);

  logout() : void {
    this.authService.logout();
  }

}
