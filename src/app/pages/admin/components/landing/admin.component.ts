import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { racketDto } from 'src/app/models/racketDto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public searchForm: FormGroup;


  public index: number;
  public racketList: racketDto[];
  public racketsNumber: number
  public pagesNumber: number;
  public loading: boolean;
  public isFiltered: boolean
  public searchedWord: string;
  public colorList: any[];
  public sexList: any[];
  public BrandList: any[];
  public selectedColors: any[];
  public selectedSex: any[];
  public selectedBrand: any[];
  public selectedOrder: string;
  public dropdownColorSettings :IDropdownSettings;
  public dropdownSexSettings :IDropdownSettings;
  public dropdownBrandSettings :IDropdownSettings;
  public trySearch: boolean;
  public errorServer: boolean;

  constructor(private appService: AppService,
    private toast:ToastrService) {

    this.trySearch = false;
    this.errorServer = false;

    this.loading = false;
    this.index = 1;
    this.pagesNumber = 0;
    this.racketList = [];
    this.racketsNumber = 0;
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });

    this.selectedOrder="default";
    this.isFiltered = false;
    this.searchedWord = "";

    this.colorList = [
      { color_id: "nero", color_text: 'Nero' },
      { color_id: "bianco", color_text: 'Bianco' },
      { color_id: "rosso", color_text: 'Rosso' },
      { color_id: "blu", color_text: 'Blu' },
      { color_id: "verde", color_text: 'Verde' },
      { color_id: "giallo", color_text: 'Giallo' },
      { color_id: "altro", color_text: 'Altri colori' }
    ];

    this.sexList = [
      { sex_id: "maschio", sex_text: 'Maschio' },
      { sex_id: "femmina", sex_text: 'Femmina' },
      { sex_id: "unisex", sex_text: 'Unisex' },
      { sex_id: "bambini", sex_text: 'Bambini' }
    ];

    this.BrandList = [
      { brand_id: "adidas", brand_text: 'Adidas' },
      { brand_id: "wilson", brand_text: 'Wilson' },
      { brand_id: "akkeron", brand_text: 'Akkeron' },
      { brand_id: "babolat", brand_text: 'Babolat' },
      { brand_id: "black_crown", brand_text: 'Black Crown' },
      { brand_id: "bullpadel", brand_text: 'Bullpadel' },
      { brand_id: "dunlop", brand_text: 'Dunlop' },
      { brand_id: "altro", brand_text: 'Altre marche' }
    ];
    this.selectedColors = [];
    this.selectedSex = [];
    this.selectedBrand = [];

    this.dropdownColorSettings = {
      singleSelection: false,
      idField: 'color_id',
      textField: 'color_text',
      selectAllText: 'Seleziona tutti',
      unSelectAllText: 'Deseleziona tutti',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSexSettings = {
      singleSelection: false,
      idField: 'sex_id',
      textField: 'sex_text',
      selectAllText: 'Seleziona tutti',
      unSelectAllText: 'Deseleziona tutti',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };

    this.dropdownBrandSettings = {
      singleSelection: false,
      idField: 'brand_id',
      textField: 'brand_text',
      selectAllText: 'Seleziona tutti',
      unSelectAllText: 'Deseleziona tutti',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.loadData();

  }

  public get searchValue() {
    return this.searchForm.get('search')?.value;
  }

  public pageIndexingHandler(value: PageEvent): void{
    this.index = value.pageIndex+1;
    if(this.isFiltered){
      this.filter();
    } else {
      this.searchedWord? this.handlerSearch() : this.loadData();
    }  }


  public updateHandlerRacket(racket : racketDto):void{


  }

  public readHandlerRacket(racket : racketDto):void{


  }


  public deleteRacket(racket: racketDto):void{
    this.errorServer = false;

    this.appService
      .deleteRacket(racket)
      .pipe(
        tap({
          next: (res) => {
            this.loading = false;
            this.toast.success("Il prodotto è stato eliminato","Eliminato")
          },
          error: (err) => {
            this.loading = false;
            this.errorServer = true;

            console.log(err);
          },
        })
      )
      .subscribe(()=>this.loadData());
  }





  public loadData(): void{
    this.errorServer = false;
    this.loading = true;
    this.appService
      .getRackets(this.index)
      .pipe(
        tap({
          next: (res) => {
            this.loading = false;
            this.racketList = res.rackets;
            this.pagesNumber = res.pages;
            this.racketsNumber = res.elements;
          },
          error: (err) => {
            this.loading = false;
            this.errorServer = true;

            console.log(err);
          },
        })
      )
      .subscribe();

  }

  public handlerFilter(): void{
    this.index = 1;
    this.filter();
  }

  public filter(): void{
    this.errorServer = false;

     const filter = {
      keyword: this.searchedWord,
      order: this.selectedOrder,
      colors: this.selectedColors.map(c =>{
        return c.color_id;
      }
      ),
      brands: this.selectedBrand.map(c =>{
        return c.brand_id;
      }
      ),
      sexList: this.selectedSex.map(c =>{
        return c.sex_id;
      }
      )
     };
     this.loading=true;
     this.isFiltered = true;
     this.appService.filterRackets(filter,this.index)
     .pipe(
      tap({
        next: (res)=>{
          this.racketList = res.rackets;
          this.pagesNumber = res.pages;
          this.racketsNumber = res.elements;

          console.log(this.pagesNumber)
          this.loading = false;

        },
        error:(err)=>{
          this.loading = false;
          this.errorServer = true;
        }
      })
     ).subscribe()
  }

  public resetFilter(): void{
    this.selectedColors = [];
    this.selectedSex = [];
    this.selectedBrand = [];
    this.selectedOrder = "default";
  }

  public onColorSelect(e: any): void{
    console.log(e);
  }

  public onColorSelectAll(e: any): void{
    console.log(e);
  }

  public onSexSelect(e: any): void{
    console.log(e);
  }

  public onSexSelectAll(e: any): void{
    console.log(e);
  }

  public onBrandSelect(e: any): void{
    console.log(e);
  }

  public onBrandSelectAll(e: any): void{
    console.log(e);
  }

  public handlerSearch(): void {
    this.resetFilter();
    this.errorServer = false;
    this.loading = true;
    this.trySearch = true;
    this.isFiltered = false;
    this.searchedWord = this.searchValue;
    this.appService
      .getRacketsBySearch(this.searchedWord,this.index)
      .pipe(
        tap({
          next: (res) => {
            this.racketList = res.rackets;
            this.pagesNumber = res.pages;
            this.racketsNumber = res.elements;

            this.colorList = res.colori.map((c : string) =>{
             return {color_id: c, color_text: c}
            })
            this.sexList = res.sessi.map((c : string) =>{
              return {sex_id: c, sex_text: c}
             })
             this.BrandList = res.marche.map((c : string) =>{
              return {brand_id: c, brand_text: c}
             })
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.errorServer = true;
          },
        })
      )
      .subscribe();
  }
}
