import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { racketDto } from 'src/app/models/racketDto';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  public racketForm: FormGroup;
  public selectedRacket: racketDto;
  public index: number;
  public racketList: racketDto[];
  public pagesNumber: number;
  public loading: boolean;

  constructor(private appService: AppService) {
    this.loading = false;
    this.selectedRacket = {} as racketDto;
    this.index = 1;
    this.pagesNumber = 0;
    this.racketList = [];
    this.racketForm = new FormGroup({
      brand: new FormControl(null),
      model: new FormControl(null),
      oldPrice: new FormControl(null),
      price: new FormControl(null),
      sex: new FormControl(null),
      mainColor: new FormControl(null),
      mosecondaryColordel: new FormControl(null),
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

    this.loadData();
    
  }

  public pageIndexingHandler(value: number): void{
    this.index = value;
    this.loadData();
  }

  public get brand(){
    return this.racketForm.get('brand')?.value;
  }

  public get oldPrice(){
    return this.racketForm.get('oldPrice')?.value;
  }

  public get price(){
    return this.racketForm.get('price')?.value;
  }
  public get sex(){
    return this.racketForm.get('sex')?.value;
  }
  public get mainColor(){
    return this.racketForm.get('mainColor')?.value;
  }
  public get mosecondaryColordel(){
    return this.racketForm.get('mosecondaryColordel')?.value;
  }
  public get profile(){
    return this.racketForm.get('profile')?.value;
  }
  public get length(){
    return this.racketForm.get('length')?.value;
  }
  public get weight(){
    return this.racketForm.get('weight')?.value;
  }
  public get idProduct(){
    return this.racketForm.get('idProduct')?.value;
  }
  public get typeGame(){
    return this.racketForm.get('typeGame')?.value;
  }
  public get typeProduct(){
    return this.racketForm.get('typeProduct')?.value;
  }
  public get image(){
    return this.racketForm.get('image')?.value;
  }
  public get seniorityPlayer(){
    return this.racketForm.get('seniorityPlayer')?.value;
  }

  public get shape(){
    return this.racketForm.get('shape')?.value;
  }
  public get age(){
    return this.racketForm.get('age')?.value;
  }
  public get balance(){
    return this.racketForm.get('balance')?.value;
  }
  public get year(){
    return this.racketForm.get('year')?.value;
  }
  public get urlProduct(){
    return this.racketForm.get('urlProduct')?.value;
  }

  public get model(){
    return this.racketForm.get('model')?.value;
  }


  public addRacket():void{
    
    const racket: racketDto = {
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
      TipoDiProdotto: this.typeProduct,
      telaio: '',
      nucleo: '',
      livelloDiGioco: '',
      forma: this.shape,
      eta: this.age,
      bilanciamento: this.balance,
      anno: this.year
    }
    console.log(racket);
    this.appService.insertRacket(racket)
    .pipe(
      tap({
        next: (res) => {
          console.log("RESPONSE: ",res);
        },
        error: (err) =>{
          console.log(err);
        },
      })
    ).subscribe(()=> this.loadData());
  }

  public deleteRacket(racket: racketDto):void{
    this.appService
      .deleteRacket(racket)
      .pipe(
        tap({
          next: (res) => {
            this.loading = false;
            
          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          },
        })
      )
      .subscribe(()=>this.loadData());
  }

  public updateRacket(): void{
    const racket: racketDto = {
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
      TipoDiProdotto: this.typeProduct,
      telaio: '',
      nucleo: '',
      livelloDiGioco: '',
      forma: this.shape,
      eta: this.age,
      bilanciamento: this.balance,
      anno: this.year
    }
    const updatedRacket = {...this.selectedRacket,...racket}
    this.appService
    .updateRacket(updatedRacket)
    .pipe(
      tap({
        next: (res) => {
          this.loading = false;
          
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
        },
      })
    )
    .subscribe(()=>{this.loadData()
                    this.cleanForm()});
  }

  private cleanForm():void{
    this.selectedRacket = {} as racketDto;

    this.racketForm.patchValue({brand: null});
    this.racketForm.patchValue({oldPrice: null});
    this.racketForm.patchValue({price: null});
    this.racketForm.patchValue({sex: null});
    this.racketForm.patchValue({mainColor: null});
    this.racketForm.patchValue({mosecondaryColordel: null});
    this.racketForm.patchValue({profile: null});
    this.racketForm.patchValue({length: null});
    this.racketForm.patchValue({weight: null});
    this.racketForm.patchValue({idProduct: null});
    this.racketForm.patchValue({typeGame: null});
    this.racketForm.patchValue({typeProduct: null});
    this.racketForm.patchValue({image: null});
    this.racketForm.patchValue({seniorityPlayer: null});
    this.racketForm.patchValue({shape: null});
    this.racketForm.patchValue({age: null});
    this.racketForm.patchValue({balance: null});
    this.racketForm.patchValue({year: null});
    this.racketForm.patchValue({urlProduct: null});
  }

  public updateHandlerRacket(racket : racketDto):void{
    this.selectedRacket = racket;

    this.racketForm.patchValue({brand: racket.marca});
    this.racketForm.patchValue({oldPrice: racket.vecchioPrezzo});
    this.racketForm.patchValue({price: racket.prezzo});
    this.racketForm.patchValue({sex: racket.sesso});
    this.racketForm.patchValue({mainColor: racket.coloreUno});
    this.racketForm.patchValue({mosecondaryColordel: racket.coloreDue});
    this.racketForm.patchValue({profile: racket.profilo});
    this.racketForm.patchValue({length: racket.lunghezza});
    this.racketForm.patchValue({weight: racket.peso});
    this.racketForm.patchValue({idProduct: racket.numeroArticolo});
    this.racketForm.patchValue({typeGame: racket.tipoDiGioco});
    this.racketForm.patchValue({typeProduct: racket.TipoDiProdotto});
    this.racketForm.patchValue({image: racket.imageLink});
    this.racketForm.patchValue({seniorityPlayer: racket.livelloDiGioco});
    this.racketForm.patchValue({shape: racket.forma});
    this.racketForm.patchValue({age: racket.eta});
    this.racketForm.patchValue({balance: racket.bilanciamento});
    this.racketForm.patchValue({year: racket.anno});
    this.racketForm.patchValue({urlProduct: racket.url});

  }

  public loadData(): void{
    this.loading = true;
    this.appService
      .getRackets(this.index)
      .pipe(
        tap({
          next: (res) => {
            this.loading = false;
            this.racketList = res.rackets;
            this.pagesNumber = res.pages;
            
          },
          error: (err) => {
            this.loading = false;
            console.log(err);
          },
        })
      )
      .subscribe();

  }
}
