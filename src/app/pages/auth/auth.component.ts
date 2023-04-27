import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthOperationType } from './enum/auth';
import { SSO_Type } from './enum/sso';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public authResultOperation: any;
  public authLoginForm: FormGroup;
  public authSignupForm: FormGroup;
  public authRecoverForm: FormGroup;

  public formSubmitAttempt: boolean;

  public messageError: string;

  public operationType: AuthOperationType;

  public ENUM_OperationType = AuthOperationType;
  public ENUM_SSO_Type = SSO_Type;



  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.authResultOperation = null;
    this.authLoginForm = new FormGroup({
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
    this.authSignupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),

    });

    this.authRecoverForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
    });

    this.formSubmitAttempt = false;
    this.messageError = '';
    this.operationType = AuthOperationType.LOGIN;
  }

  public get emailLogin(): any { return this.authLoginForm.get('email') }
  public get passwordLogin(): any { return this.authLoginForm.get('password') }


  public get usernameSignup(): any { return this.authSignupForm.get('username') }
  public get emailSignup(): any { return this.authSignupForm.get('email') }
  public get passwordSignup(): any { return this.authSignupForm.get('password') }
  public get firstNameSignup(): any { return this.authSignupForm.get('firstName') }
  public get lastNameSignup(): any { return this.authSignupForm.get('lastName') }
  public get roleSignup(): any { return this.authSignupForm.get('role') }

  public get emailRecover(): any { return this.authRecoverForm.get('email') }

  public authLogin(): void {
    this.formSubmitAttempt = true;
    if (this.authLoginForm.valid) {
      this.authService.login(this.emailLogin.value, this.passwordLogin.value);
      this.authService.statusResultSubject
        .subscribe(res => {
          if (res) {
            const { status, err } = res;
            if (status == 'err') {
              console.log(status)
              switch (err.status) {
                case 401:
                  this.messageError = 'Utente non riconosciuto, controllare la password o la mail';
                  break;
                default:
                  this.messageError = 'Errore del server, riprovare più tardi';
              }
              this.toastr.error(this.messageError, 'Attenzione')
            }
          }
        })
    }

  }

  public authSSO(SSO_Type:SSO_Type): void {
      switch (SSO_Type) {
        case this.ENUM_SSO_Type.GOOGLE:{
          //this.authService.loginGOOGLE();

          google.accounts.id.initialize({
            client_id:"600543089869-plavm2lirv6k30ti8mf76rgeicu28tr2.apps.googleusercontent.com",
            auto_select: false, // optional
            //cancel_on_tap_outside: false, // optional
            /* redirectUri: 'http://localhost:4200/admin',
            issuer: 'https://accounts.google.com', */
            //context: 'signin', // optional
          })
          google.accounts.id.prompt(); // also display the One Tap dialog

        }
          break;
        default:
          break;
      }
  }

  public authSignup(): void {
    this.formSubmitAttempt = true;
    if (this.authSignupForm.valid) {
      const newUser = {
        emailAddress: this.emailSignup.value,
        password: this.passwordSignup.value,
        userName: this.usernameSignup.value,
        lastName: this.lastNameSignup.value,
        firstName: this.firstNameSignup.value,
        role: this.roleSignup.value,
      }
      console.log(newUser)

      this.authService.signup(newUser);
      this.authService.statusResultSubject
        .subscribe(res => {
          if (res) {
            const { status, err } = res;
            if (status == 'err') {
              console.log(err)
              this.messageError = err.error;
              this.toastr.error(this.messageError, 'Attenzione')
            }
            else {
              this.toastr.success('Utente registrato correttamente', 'Compleato!')
              this.formSubmitAttempt = false;
            }
          }
        }
        )
    }

  }

  public authResetPassword(): void {
    this.formSubmitAttempt = true;
    if (this.authRecoverForm.valid) {
      this.toastr.success('Riceverai via email la procedura per modificare la password', 'Richiesta Inviata')
    }
  }

  public changeAuthOperation(operationType: AuthOperationType): void {
    this.formSubmitAttempt = false;
    this.operationType = operationType;
  }

  public fieldIsInvalid(field: AbstractControl): any {
    //const field = this.racketForm.get(fieldArg)
    return (field?.invalid && field?.touched) || (field?.invalid && this.formSubmitAttempt)
    //(userJobHS.status=='INVALID'  && userJobHS.touched) || (userJobHS.status=='INVALID' && trySubmit)"
  }
}
