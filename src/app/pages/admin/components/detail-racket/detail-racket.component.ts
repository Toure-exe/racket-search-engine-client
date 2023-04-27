import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { racketDto } from 'src/app/shared/models/racketDto';

@Component({
  selector: 'app-detail-racket',
  templateUrl: './detail-racket.component.html',
  styleUrls: ['./detail-racket.component.scss']
})
export class DetailRacketComponent {
  public selectedRacket: racketDto;
  constructor(
    private router: Router
  ) {
    this.selectedRacket = this.router.getCurrentNavigation()?.extras.state as racketDto;
  }
}
