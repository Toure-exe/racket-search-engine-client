import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { racketDto } from 'src/app/models/racketDto';

import { OperationType } from '../../enum/operation-type'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public loading: boolean;

  public racketForm: FormGroup;
  public selectedRacket: racketDto;

  public operationType: OperationType;
  public OperationType = OperationType;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private toast:ToastrService
    ) {

    this.loading = false;

    const path = this.route.snapshot.url[0].toString();
    path == 'new-racket' ? this.operationType = OperationType.NEW : this.operationType = OperationType.EDIT;

    this.selectedRacket = this.router.getCurrentNavigation()?.extras.state as racketDto;

    this.racketForm = new FormGroup({
      brand: new FormControl(null),
      model: new FormControl(null),
      oldPrice: new FormControl(null),
      price: new FormControl(null),
      sex: new FormControl(null),
      mainColor: new FormControl(null),
      secondaryColor: new FormControl(null),
      profile: new FormControl(null),
      length: new FormControl(null),
      weight: new FormControl(null),
      idProduct: new FormControl(null),
      typeGame: new FormControl(null),
      typeProduct: new FormControl(null),
      image: new FormControl(null),
      material: new FormControl(null),
      seniorityPlayer: new FormControl(null),
      shape: new FormControl(null),
      age: new FormControl(null),
      balance: new FormControl(null),
      year: new FormControl(null),
      urlProduct: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.selectedRacket && this.updateRacketForm()
  }

  public get brand() {
    return this.racketForm.get('brand')?.value;
  }

  public get oldPrice() {
    return this.racketForm.get('oldPrice')?.value;
  }

  public get price() {
    return this.racketForm.get('price')?.value;
  }
  public get sex() {
    return this.racketForm.get('sex')?.value;
  }
  public get mainColor() {
    return this.racketForm.get('mainColor')?.value;
  }
  public get mosecondaryColordel() {
    return this.racketForm.get('mosecondaryColordel')?.value;
  }
  public get profile() {
    return this.racketForm.get('profile')?.value;
  }
  public get length() {
    return this.racketForm.get('length')?.value;
  }
  public get weight() {
    return this.racketForm.get('weight')?.value;
  }
  public get idProduct() {
    return this.racketForm.get('idProduct')?.value;
  }
  public get typeGame() {
    return this.racketForm.get('typeGame')?.value;
  }
  public get typeProduct() {
    return this.racketForm.get('typeProduct')?.value;
  }
  public get image() {
    return this.racketForm.get('image')?.value;
  }
  public get seniorityPlayer() {
    return this.racketForm.get('seniorityPlayer')?.value;
  }

  public get shape() {
    return this.racketForm.get('shape')?.value;
  }
  public get age() {
    return this.racketForm.get('age')?.value;
  }
  public get balance() {
    return this.racketForm.get('balance')?.value;
  }
  public get year() {
    return this.racketForm.get('year')?.value;
  }
  public get urlProduct() {
    return this.racketForm.get('urlProduct')?.value;
  }

  public get model() {
    return this.racketForm.get('model')?.value;
  }

  public addRacket(): void {

    const racket: Partial<racketDto> = {
      prezzo: this.price,
      vecchioPrezzo: this.oldPrice,
      marca: this.brand,
      modello: this.model,
      sesso: this.sex,
      imageLink: this.image,
      coloreUno: this.mainColor,
      coloreDue: this.mosecondaryColordel,
      profilo: this.profile,
      lunghezza: this.length,
      peso: this.weight,
      numeroArticolo: this.idProduct,
      puntoDiEquilibrio: 0,
      tipoDiGioco: this.typeGame,
      url: this.urlProduct,
      tipoDiProdotto: this.typeProduct,
      telaio: '',
      nucleo: '',
      livelloDiGioco: '',
      forma: this.shape,
      eta: this.age,
      bilanciamento: this.balance,
      anno: this.year
    }
    this.appService.insertRacket(racket)
      .pipe(
        tap({
          next: (res) => {
            console.log("RESPONSE: ", res);
            this.toast.success("Il prodotto è stato aggiunto con successo","Nuovo Prodotto Inserito")

          },
          error: (err) => {
            console.log(err);
          },
        })
      ).subscribe();
  }
  public updateRacket(): void {
    const racket: Partial<racketDto> = {
      prezzo: this.price,
      vecchioPrezzo: this.oldPrice,
      marca: this.brand,
      modello: this.model,
      sesso: this.sex,
      imageLink: this.image,
      coloreUno: this.mainColor,
      coloreDue: this.mosecondaryColordel,
      profilo: this.profile,
      lunghezza: this.length,
      peso: this.weight,
      numeroArticolo: this.idProduct,
      puntoDiEquilibrio: 0,
      tipoDiGioco: this.typeGame,
      url: this.urlProduct,
      tipoDiProdotto: this.typeProduct,
      telaio: '',
      nucleo: '',
      livelloDiGioco: '',
      forma: this.shape,
      eta: this.age,
      bilanciamento: this.balance,
      anno: this.year,
      //racketId: this.idProduct
    }
    const updatedRacket = { ...this.selectedRacket, ...racket }
    this.appService
      .updateRacket(updatedRacket)
      .pipe(
        tap({
          next: (res) => {
            this.loading = false;
            this.toast.success("Il prodotto è stato modificato con successo","Prodotto Modificato")

          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          },
        })
      )
      .subscribe()
  }

  private cleanForm(): void {
    this.selectedRacket = {} as racketDto;

    this.racketForm.patchValue({ brand: null });
    this.racketForm.patchValue({ model: null });

    this.racketForm.patchValue({ oldPrice: null });
    this.racketForm.patchValue({ price: null });
    this.racketForm.patchValue({ sex: null });
    this.racketForm.patchValue({ mainColor: null });
    this.racketForm.patchValue({ mosecondaryColordel: null });
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
    const  racket = this.selectedRacket

    this.racketForm.patchValue({ brand: racket.marca });
    this.racketForm.patchValue({ model: racket.modello });
    this.racketForm.patchValue({ oldPrice: racket.vecchioPrezzo });
    this.racketForm.patchValue({ price: racket.prezzo });
    this.racketForm.patchValue({ sex: racket.sesso });
    this.racketForm.patchValue({ mainColor: racket.coloreUno });
    this.racketForm.patchValue({ mosecondaryColordel: racket.coloreDue });
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
}
