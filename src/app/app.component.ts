import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventType } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { tap } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Motore di ricerca padel';

  public searchForm: FormGroup;
  public result: any[];
  public loading: boolean;
  public trySearch: boolean;
  public errorServer: boolean;
  public index: number;
  public pagesNumber: number;
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

  constructor(private appService: AppService) {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });
    this.selectedOrder="default";
    this.result = [];
    this.loading = false;
    this.trySearch = false;
    this.errorServer = false;
    this.index = 1;
    this.pagesNumber =1;
    this.loadData();
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
    

    
  }

  public get searchValue() {
    return this.searchForm.get('search')?.value;
  }

  public handlerSearch(): void {
    this.errorServer = false;
    this.loading = true;
    this.trySearch = true;
    this.appService
      .getRacketsBySearch(this.searchValue)
      .pipe(
        tap({
          next: (res) => {
            this.result = res;
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

  public loadData(): void {
    this.errorServer = false;
    this.loading = true;
    this.appService
      .getRackets(this.index)
      .pipe(
        tap({
          next: (res) => {
            this.result = res.rackets;
            this.pagesNumber = res.pages;
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

  public clearData(): void {
    this.result = [];
    this.trySearch = false;
    this.errorServer = false;
    this.index = 1;
  }

  public pageIndexingHandler(value: number): void{
    this.index = value;
    this.loadData();
  }

  public filter(): void{
    console.log(this.selectedOrder,this.selectedColors,
      this.selectedSex,this.selectedBrand);
  }

  public resetFilter(): void{
    this.selectedColors = [];
    this.selectedSex = [];
    this.selectedBrand = [];
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

}
