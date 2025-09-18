import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

//Following suggestions from: https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html
//and: https://stackoverflow.com/questions/59972242/angular-show-cached-data-and-update-the-new-data-if-needed-data-in-background
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private budgetData: any | null = null;

  constructor(private http: HttpClient) {}

  getBudgetData(): Observable<any> {
    // If we already have the data cached, return it as an Observable
    if (this.budgetData) {
      return of(this.budgetData);
    }

    // Otherwise fetch from backend and cache
    return this.http.get('http://localhost:3000/budget').pipe(
      tap((res: any) => {
        this.budgetData = res; // cache result
      })
    );
  }
}
