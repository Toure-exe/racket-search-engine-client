import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { racketDto } from './models/racketDto';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public url: string;
  public url_search: string;
  public url_filter: string;
  public url_insertRacket: string;
  public url_delete: string;
  public url_update: string;
  constructor(private http:HttpClient) { 
    this.url =        "https://localhost:7217/api/Racket/rackets/";
    this.url_search = "https://localhost:7217/api/Racket/search/";
    this.url_filter = "https://localhost:7217/api/Racket/rackets/filter/";
    this.url_insertRacket = "https://localhost:7217/api/Racket/rackets/insert";
    this.url_delete = "https://localhost:7217/api/Racket/";
    this.url_update = "https://localhost:7217/api/Racket/";
  }

  public getRackets(index: number) : Observable<any> {
    return this.http.get(this.url+index) as Observable<any>;
  }

  public getRacketsBySearch(word:string, currentPage:number) : Observable<any> {
    const url = this.url_search+word+"?page="+currentPage;
    console.log(url);
    return this.http.get(url) as Observable<any>;
  }

  public filterRackets(filter: any, currentPage:number): Observable<any> {
    return this.http.post(this.url_filter+currentPage,filter) as Observable<any>;
  }

  public insertRacket(racket: racketDto): Observable<any>{
    return this.http.post(this.url_insertRacket,racket);
  }

  public deleteRacket(racket: racketDto): Observable<any>{
    return this.http.delete(this.url_delete+racket.racketId)
  }

  public updateRacket(racket: racketDto): Observable<any>{
    return this.http.put(this.url_update+racket.racketId,racket);
  }
}
