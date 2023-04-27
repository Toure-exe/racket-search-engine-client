import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { racketDto } from 'src/app/shared/models/racketDto';

import { OperationType } from '../../enum/operation-type'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public loading: boolean;
  public errorServer: boolean;


  public racketForm: FormGroup;
  public selectedRacket: racketDto;

  public operationType: OperationType;
  public OperationType = OperationType;

  public formSubmitAttempt: boolean;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {

    this.errorServer = false;
    this.loading = false;

    const path = this.route.snapshot.url[0].toString();
    path == 'new-racket' ? this.operationType = OperationType.NEW : this.operationType = OperationType.EDIT;

    this.selectedRacket = this.router.getCurrentNavigation()?.extras.state as racketDto;

    this.racketForm = new FormGroup({
      brand: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      oldPrice: new FormControl(null),
      price: new FormControl(null, Validators.required),
      sex: new FormControl(null),
      mainColor: new FormControl(null, Validators.required),
      secondaryColor: new FormControl(null),
      profile: new FormControl(null),
      length: new FormControl(null),
      weight: new FormControl(null),
      idProduct:new FormControl(null),
      typeGame: new FormControl(null),
      typeProduct:new FormControl(null),
      image: new FormControl(null),
      material: new FormControl(null),
      seniorityPlayer: new FormControl(null),
      shape: new FormControl(null),
      age:new FormControl(null),
      balance: new FormControl(null),
      year: new FormControl(null, Validators.required),
      urlProduct: new FormControl(null)
    });

    this.formSubmitAttempt = false;
  }

  ngOnInit(): void {
    this.selectedRacket && this.updateRacketForm();
    console.log(this.racketForm,this.brand)
  }

  public get brand() {
    return this.racketForm.get('brand');
  }

  public get oldPrice() {
    return this.racketForm.get('oldPrice');
  }

  public get price() {
    return this.racketForm.get('price');
  }
  public get sex() {
    return this.racketForm.get('sex');
  }
  public get mainColor() {
    return this.racketForm.get('mainColor');
  }
  public get secondaryColor() {
    return this.racketForm.get('secondaryColor');
  }
  public get profile() {
    return this.racketForm.get('profile');
  }
  public get length() {
    return this.racketForm.get('length');
  }
  public get weight() {
    return this.racketForm.get('weight');
  }
  public get idProduct() {
    return this.racketForm.get('idProduct');
  }
  public get typeGame() {
    return this.racketForm.get('typeGame');
  }
  public get typeProduct() {
    return this.racketForm.get('typeProduct');
  }
  public get image() {
    return this.racketForm.get('image');
  }
  public get seniorityPlayer() {
    return this.racketForm.get('seniorityPlayer');
  }

  public get shape() {
    return this.racketForm.get('shape');
  }
  public get age() {
    return this.racketForm.get('age');
  }
  public get balance() {
    return this.racketForm.get('balance');
  }
  public get year() {
    return this.racketForm.get('year');
  }
  public get urlProduct() {
    return this.racketForm.get('urlProduct');
  }

  public get model() {
    return this.racketForm.get('model');
  }

  public addRacket(): void {
    this.errorServer = false;
    this.formSubmitAttempt = true;
    if (this.racketForm.valid) {
      console.log('ok')
      const racket = this.generateRacketObject();
      this.appService.insertRacket(racket)
        .pipe(
          tap({
            next: (res) => {
              console.log("RESPONSE: ", res);
              this.toast.success("Il prodotto è stato aggiunto con successo", "Nuovo Prodotto Inserito")

            },
            error: (err) => {
              this.errorServer = true;
              console.log(err);
            },
          })
        ).subscribe();
    }

  }
  public updateRacket(): void {
    this.errorServer = false;
    this.formSubmitAttempt = true;

    if (this.racketForm.valid) {

      const racket = this.generateRacketObject()
      const updatedRacket = { ...this.selectedRacket, ...racket }
      this.appService
        .updateRacket(updatedRacket)
        .pipe(
          tap({
            next: (res) => {
              this.loading = false;
              this.toast.success("Il prodotto è stato modificato con successo", "Prodotto Modificato")

            },
            error: (err) => {
              this.loading = false;
              this.errorServer = true;

              console.log(err);
            },
          })
        )
        .subscribe()
    }
  }

  private cleanForm(): void {
    this.selectedRacket = {} as racketDto;

    this.racketForm.patchValue({ brand: null });
    this.racketForm.patchValue({ model: null });

    this.racketForm.patchValue({ oldPrice: null });
    this.racketForm.patchValue({ price: null });
    this.racketForm.patchValue({ sex: null });
    this.racketForm.patchValue({ mainColor: null });
    this.racketForm.patchValue({ secondaryColor: null });
    this.racketForm.patchValue({ profile: null });
    this.racketForm.patchValue({ length: null });
    this.racketForm.patchValue({ weight: null });
    this.racketForm.patchValue({ idProduct: null });
    this.racketForm.patchValue({ typeGame: null });
    this.racketForm.patchValue({ typeProduct: null });
    this.racketForm.patchValue({ image: null });
    this.racketForm.patchValue({ seniorityPlayer: null });
    this.racketForm.patchValue({ shape: null });
    this.racketForm.patchValue({ age: null });
    this.racketForm.patchValue({ balance: null });
    this.racketForm.patchValue({ year: null });
    this.racketForm.patchValue({ urlProduct: null });
  }

  public updateRacketForm(): void {
    const racket = this.selectedRacket

    this.racketForm.patchValue({ brand: racket.marca });
    this.racketForm.patchValue({ model: racket.modello });
    this.racketForm.patchValue({ oldPrice: racket.vecchioPrezzo });
    this.racketForm.patchValue({ price: racket.prezzo });
    this.racketForm.patchValue({ sex: racket.sesso });
    this.racketForm.patchValue({ mainColor: racket.coloreUno });
    this.racketForm.patchValue({ secondaryColor: racket.coloreDue });
    this.racketForm.patchValue({ profile: racket.profilo });
    this.racketForm.patchValue({ length: racket.lunghezza });
    this.racketForm.patchValue({ weight: racket.peso });
    this.racketForm.patchValue({ idProduct: racket.numeroArticolo });
    this.racketForm.patchValue({ typeGame: racket.tipoDiGioco });
    this.racketForm.patchValue({ typeProduct: racket.tipoDiProdotto });
    this.racketForm.patchValue({ image: racket.imageLink });
    this.racketForm.patchValue({ seniorityPlayer: racket.livelloDiGioco });
    this.racketForm.patchValue({ shape: racket.forma });
    this.racketForm.patchValue({ age: racket.eta });
    this.racketForm.patchValue({ balance: racket.bilanciamento });
    this.racketForm.patchValue({ year: racket.anno });
    this.racketForm.patchValue({ urlProduct: racket.url });

  }

  public fieldIsInvalid(fieldArg:string): any {
    const field = this.racketForm.get(fieldArg)
    return (field?.invalid && field?.touched) || (field?.invalid && this.formSubmitAttempt)
    //(userJobHS.status=='INVALID'  && userJobHS.touched) || (userJobHS.status=='INVALID' && trySubmit)"
  }

  private generateRacketObject(): Partial<racketDto> {
    const racket: Partial<racketDto> = {
      prezzo: this.price?.value,
      vecchioPrezzo: this.oldPrice?.value,
      marca: this.brand?.value,
      modello: this.model?.value,
      sesso: this.sex?.value,
      imageLink: this.image?.value,
      coloreUno: this.mainColor?.value,
      coloreDue: this.secondaryColor?.value,
      profilo: this.profile?.value,
      lunghezza: this.length?.value,
      peso: this.weight?.value,
      numeroArticolo: this.idProduct?.value,
      puntoDiEquilibrio: 0,
      tipoDiGioco: this.typeGame?.value,
      url: this.urlProduct?.value,
      tipoDiProdotto: this.typeProduct?.value,
      telaio: '',
      nucleo: '',
      livelloDiGioco: '',
      forma: this.shape?.value,
      eta: this.age?.value,
      bilanciamento: this.balance?.value,
      anno: this.year?.value,
    }
    return racket;
  }
}
