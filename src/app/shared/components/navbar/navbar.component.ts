import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges{

  public isLogged : boolean;
  constructor(private authService: AuthService){
   this.isLogged = this.authService.userLogged();
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  public logout(): void {
    this.authService.logout();
  }
}
