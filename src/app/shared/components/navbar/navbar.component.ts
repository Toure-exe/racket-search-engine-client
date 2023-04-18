import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isLogged: boolean;

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.userLogged();
    this.authService.isLogged.subscribe(status =>
      this.isLogged = status
    );
  }

  public logout(): void {
    this.authService.logout();
  }
}
