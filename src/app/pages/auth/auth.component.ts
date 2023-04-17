import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public authForm: FormGroup;

  constructor(private authService: AuthService){
    this.authForm  = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    })
  }

  public get email():any{ return this.authForm.get('email')}
  public get password():any{ return this.authForm.get('password')}

  public authLogin(): void {
    this.authService.login(this.email.value, this.password.value)
  }

  public authSSO(): void {

  }
}
