import { Injectable } from '@angular/core';
import { ActiveAccount } from './active-account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  public accountActive: ActiveAccount;

  public token: string;
  constructor(private router: Router) {
    this.token = '';
    this.accountActive = {
      username: '',
      password: '',
    }
  }

  public login(username: string, password: string): void {
    this.accountActive.username = username;
    this.accountActive.password = password;
    sessionStorage.setItem('user', JSON.stringify(this.accountActive))
    this.router.navigate(['admin'])

  }

  public logout(): void {
    sessionStorage.clear();
    this.router.navigate([''])
  }

  public userLogged(): boolean {
    return sessionStorage.getItem('user') ? true : false;
  }
}
