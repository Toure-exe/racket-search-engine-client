import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string,value:any):void{
    localStorage.setItem(key,JSON.stringify(value))
  }

  public getItem(key: string,):any{
    return JSON.parse(JSON.parse(JSON.stringify((localStorage.getItem(key)))));
  }
}
