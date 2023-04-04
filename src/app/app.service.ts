import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public url: string;
  public url_search: string;
  constructor(private http:HttpClient) { 
    this.url ="https://localhost:7217/api/Racket/rackets/";
    this.url_search = "https://localhost:7217/api/Racket/search/";
  }

  public getRackets(index: number) : Observable<any> {
    return this.http.get(this.url+index) as Observable<any>;
  }

  public getRacketsBySearch(word:string) : Observable<any[]> {
    return this.http.get(this.url_search+word) as Observable<any[]>;
  }
}
