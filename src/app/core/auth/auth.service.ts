import { Injectable } from '@angular/core';
import { ActiveAccount } from './active-account';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, map, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ApiUrl } from 'src/app/config/api-url'
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public token: string;
  private statusResult$: Subject<any>
  private isLogged$: Subject<boolean>;
  private accountActive$: Subject<ActiveAccount>;

  private statusResult$$: Subscription
  private isLogged$$: Subscription
  private accountActive$$: Subscription

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient,
  ) {
    this.token = '';

    this.statusResult$ = new Subject<any>();
    this.isLogged$ = new Subject<boolean>();
    this.accountActive$ = new Subject<ActiveAccount>();

    this.statusResult$.next(null);
    this.isLogged$.next(!!this.localStorage.getItem('user'));
    this.accountActive$.next(this.localStorage.getItem('user'));

    this.statusResult$$ = new Subscription();
    this.isLogged$$ = new Subscription();
    this.accountActive$$ = new Subscription();
  }

  public get statusResultSubject(): Subject<any> {
    return this.statusResult$;
  }

  public get isLoggedSubject(): Subject<boolean> {
    return this.isLogged$;
  }

  public get userActiveSubject(): Subject<ActiveAccount> {
    return this.accountActive$;
  }

  public login(username: string, password: string): void {
    this.statusResult$ = new Subject<any>();

    this.loginApi(username, password).pipe(
      tap()
    ).subscribe(
      {
        next: res => {
          this.token = res.token.result;
          this.localStorage.setItem('token', this.token)
          const user = JSON.parse(window.atob(this.token.split('.')[1]));
          this.localStorage.setItem('user', user)

          this.isLogged$.next(true)
          this.accountActive$.next(user)
          this.statusResult$.next({ status: 'ok', res });

          this.router.navigate(['admin'])
        },
        error: err => { this.statusResult$.next({ status: 'err', err }) },
        complete: () => { return 'ok' }
      }
    )
  }

  public signup(newUser:any): void {
    this.statusResult$ = new Subject<any>();

    this.signupApi(newUser).pipe(
      tap(()=>console.log('asdsss'))
    ).subscribe(
      {
        next: res => {
          this.statusResult$.next({ status: 'ok', res });
        },
        error: err => { this.statusResult$.next({ status: 'err', err }) },
        complete: () => { return 'ok' }
      }
    )
  }

  public logout(): void {
    localStorage.clear();

    this.statusResult$.next({ status: 'logout' });
    this.isLogged$.next(false);
    this.accountActive$.next({} as ActiveAccount);

    //this.statusResult$.unsubscribe()
    //this.isLogged$.unsubscribe()
    //this.accountActive$.unsubscribe()
    this.router.navigate([''])

  }

  public isUserLogged(): boolean {
    return !!localStorage.getItem('user')
  }

  public userLogged(): ActiveAccount {
    return this.localStorage.getItem('user') as ActiveAccount;
  }


  private loginApi(emailAddress: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${ApiUrl.AUTHENTICATION}/${ApiUrl.LOGIN}`, { emailAddress, password })
  }

  private signupApi(newUser:any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${ApiUrl.AUTHENTICATION}/${ApiUrl.REGISTER}`, newUser)
  }
}
