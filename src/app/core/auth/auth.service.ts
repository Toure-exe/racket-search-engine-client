import { Injectable } from '@angular/core';
import { ActiveAccount } from './active-account';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  public accountActive: ActiveAccount;
  public token: string;
  private isLogged$: Subject<boolean>;

  constructor(private router: Router) {
    this.token = '';
    this.accountActive = {
      username: '',
      password: '',
    };
    this.isLogged$ = new Subject<boolean>();
    this.isLogged$.next(!!localStorage.getItem('user'));

  }
  public get isLogged(): Subject<boolean> {
    return this.isLogged$;
  }

  public login(username: string, password: string): void {
    this.accountActive.username = username;
    this.accountActive.password = password;
    localStorage.setItem('user', JSON.stringify(this.accountActive))
    this.isLogged$.next(true)

    this.router.navigate(['admin'])

  }

  public logout(): void {
    localStorage.clear();
    this.isLogged$.next(false)
    this.router.navigate([''])

  }

  public userLogged(): boolean {
    return !!localStorage.getItem('user')
  }
}
