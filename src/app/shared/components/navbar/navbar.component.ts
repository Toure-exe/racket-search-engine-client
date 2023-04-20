import { Component, OnDestroy } from '@angular/core';
import { ActiveAccount } from 'src/app/core/auth/active-account';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isLogged: boolean;
  public user:ActiveAccount;

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.isUserLogged();
    this.user = this.authService.userLogged();

    this.authService.isLoggedSubject.subscribe(status =>
      this.isLogged = status
    );

    this.authService.userActiveSubject.subscribe(status =>
      this.user = status
    );

  }

  public logout(): void {
    this.authService.logout();
  }
}
