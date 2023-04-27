import { Injectable, NgZone } from '@angular/core';
import { ActiveAccount } from './active-account';
import { Router } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ApiUrl } from 'src/app/config/api-url';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import * as google from 'google-one-tap'
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public token: string;
  private statusResult$: Subject<any>
  private isLogged$: Subject<boolean>;
  private accountActive$: Subject<ActiveAccount>;
  private authCodeFlowConfig: AuthConfig;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private http: HttpClient,
    private oAuthService: OAuthService,
    private ngZone: NgZone,
    //private googleAccount: accounts
  ) {
    this.token = '';

    this.authCodeFlowConfig = {
      // Url of the Identity Provider
      issuer: 'https://accounts.google.com',
      //redirectUri:'https://localhost:7011/signin-google',
      redirectUri: 'http://localhost:4200/admin',
      clientId: "600543089869-plavm2lirv6k30ti8mf76rgeicu28tr2.apps.googleusercontent.com",
      scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly',
      showDebugInformation: true,
      strictDiscoveryDocumentValidation: false
    };

    const options = {
      client_id: "600543089869-plavm2lirv6k30ti8mf76rgeicu28tr2.apps.googleusercontent.com",
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: 'signin', // optional
    };

    /* googleOneTap(options, (response:any) => {
      // Send response to server
      console.log(response);
    }); */

    /* googleOneTap.accounts.id.initialize({
        client_id: "600543089869-plavm2lirv6k30ti8mf76rgeicu28tr2.apps.googleusercontent.com",
        auto_select: false,
        //callback: this.handleCredentialResponse
        cancel_on_tap_outside: true
      }) */


     /*  google.accounts.id.initialize({
        client_id: "600543089869-plavm2lirv6k30ti8mf76rgeicu28tr2.apps.googleusercontent.com",
        auto_select: false,
        cancel_on_tap_outside: true
      }) */

    //this.oAuthService.loadDiscoveryDocumentAndTryLogin();

    this.statusResult$ = new Subject<any>();
    this.isLogged$ = new Subject<boolean>();
    this.accountActive$ = new Subject<ActiveAccount>();

    this.statusResult$.next(null);
    this.isLogged$.next(!!this.localStorage.getItem('user'));
    this.accountActive$.next(this.localStorage.getItem('user'));


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

  public loginGOOGLE(): void {
    console.log('asd')
    //this.oAuthService.initLoginFlow();


    //this.oAuthService.loadDiscoveryDocumentAndTryLogin();

    /* this.oAuthService.configure(this.authCodeFlowConfig);
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        }
        else {
          this.oAuthService.loadUserProfile().then((userProfile) => {
            alert(userProfile)
            console.log(userProfile)
            console.log(JSON.stringify(userProfile))

          })
        }
      })
    }) */
  }

  public signup(newUser: any): void {
    this.statusResult$ = new Subject<any>();

    this.signupApi(newUser).pipe(
      tap(() => console.log('asdsss'))
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

  private signupApi(newUser: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${ApiUrl.AUTHENTICATION}/${ApiUrl.REGISTER}`, newUser)
  }
}
